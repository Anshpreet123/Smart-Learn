import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // Call your backend to create a payment intent
    const response = await fetch(
      'http://localhost:5000/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 7900 }), // amount in cents ($79.00)
      },
    );

    const { clientSecret } = await response.json();

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else {
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <CardElement className="p-3 border rounded-lg" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full mt-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition duration-300"
      >
        Pay $79.00
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Checkout</h2>
        <CheckoutForm />
      </div>
    </div>
  </Elements>
);

export default Checkout;
