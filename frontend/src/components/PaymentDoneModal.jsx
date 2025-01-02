import React from 'react'

const PaymentDoneModal = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="text-center">
                <div className="mx-auto h-16 w-16 mb-4">
                    <svg className="h-full w-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 ">Payment Received</h2>
                <h1 className='mb-4'>from {props.paymentDetails?.user.fullname.firstname} {props.paymentDetails?.user.fullname.lastname}</h1>
                <p className="text-2xl font-bold text-green-600 mb-4">$ {props.paymentDetails?.fare}</p>
                <p className="text-gray-600 mb-6">Thank you for your service . please complete the ride.</p>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    onClick={()=>{props.setPaymentPanel(false)}}
                >
                    Done
                </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentDoneModal