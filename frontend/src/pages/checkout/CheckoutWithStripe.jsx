import React from 'react';

const CheckoutWithStripe = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between border-b pb-4 mb-4">
            <span>Course Name</span>
            <span className="font-medium">$99.00</span>
          </div>
          <div className="flex justify-between border-b pb-4 mb-4">
            <span>Discount</span>
            <span className="text-green-500">-$20.00</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$79.00</span>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <form>
            <label className="block mb-4">
              <span className="text-gray-700">Cardholder Name</span>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-2 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Card Number</span>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="mt-2 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Expiration Date</span>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="mt-2 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">CVC</span>
                <input
                  type="text"
                  placeholder="123"
                  className="mt-2 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Complete Purchase Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition duration-300"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckoutWithStripe;
