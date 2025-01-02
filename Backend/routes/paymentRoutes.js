const express = require("express");
const router = express.Router();
const razorpayInstance = require("../services/razorpay");
const crypto = require("crypto");
const {sendMessageToSocketId}=require('../socket')


//Order Creation API
router.post("/create-order", async (req, res) => {
  const { amount, currency, captainId } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹500 = 50000 paise)
      currency,
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//Payment Verification API
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      captainId,
      amount,
      rideDetails,
    } = req.body;
    
    const secret = "N7caxwXAMgd8MVlE1IfrY7h8";

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment details",
      });
    }

    if (!captainId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing captain ID or payment amount",
      });
    }

    // Generate signature locally
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Payment verification successful
      try {
        sendMessageToSocketId(captainId, {
          event:"payment-done",
          data: rideDetails,
        });

        console.log(`Captain ${captainId} notified about payment.`);
        res.json({ success: true, message: "Payment verified successfully" });
      } catch (socketError) {
        console.error("Error sending socket message:", socketError);
        res.status(500).json({
          success: false,
          message: "Payment verified, but notification failed",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error in /verify-payment route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});




module.exports = router;


