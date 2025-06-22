import { useState, useEffect } from "react";
import { FaShippingFast, FaCreditCard, FaPaypal, FaInfoCircle, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaFlag, FaCalendarAlt, FaLock, FaPaypal as FaPaypalIcon, FaCheckCircle, FaSpinner } from "react-icons/fa";

function Checkout({ onClose}) {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    paypalEmail: "",
    paypalPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').slice(0, 19);
    setFormValues({ ...formValues, cardNumber: formattedValue });
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
    setFormValues({ ...formValues, expiryDate: formattedValue });
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.slice(0, 3);
    setFormValues({ ...formValues, cvv: formattedValue });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.fullName) newErrors.fullName = "Full Name is required";
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.phone) newErrors.phone = "Phone number is required";
    if (!formValues.address) newErrors.address = "Address is required";
    if (!formValues.city) newErrors.city = "City is required";
    if (!formValues.zip) newErrors.zip = "ZIP Code is required";
    if (!formValues.country) newErrors.country = "Country is required";
    if (paymentMethod === "credit") {
      if (!formValues.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formValues.cardNumber)) newErrors.cardNumber = "Card number must be in the format xxxx xxxx xxxx xxxx";
      if (!formValues.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formValues.expiryDate)) newErrors.expiryDate = "Expiry date must be in the format MM/YY";
      if (!formValues.cvv) newErrors.cvv = "CVV is required";
      if (!/^[0-9]{3}$/.test(formValues.cvv)) newErrors.cvv = "CVV must be 3 digits";
      if (!formValues.cardholderName) newErrors.cardholderName = "Cardholder name is required";
    } else if (paymentMethod === "paypal") {
      if (!formValues.paypalEmail) newErrors.paypalEmail = "PayPal email is required";
      if (!formValues.paypalPassword) newErrors.paypalPassword = "PayPal password is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsApproved(true);
        setIsSubmitting(false);
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };


  
  useEffect(() => {
    if (isApproved) {
    }
  }, [isApproved]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[400px] max-h-screen overflow-y-auto p-6 rounded-lg shadow-lg">
        {!isApproved ? (
          <>
            {/* Shipping Information Header */}
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <FaShippingFast className="text-blue-600" />
              <span>Shipping Information</span>
            </div>

            {/* Shipping Information Form */}
            <div className="space-y-3">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input type="text" name="fullName" className="w-full p-2 outline-none" placeholder="Full Name" value={formValues.fullName} onChange={handleChange} />
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input type="email" name="email" className="w-full p-2 outline-none" placeholder="Email Address" value={formValues.email} onChange={handleChange} />
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaPhone className="text-gray-400 mr-2" />
                <input type="tel" name="phone" className="w-full p-2 outline-none" placeholder="Phone Number" value={formValues.phone} onChange={handleChange} />
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input type="text" name="address" className="w-full p-2 outline-none" placeholder="Street Address" value={formValues.address} onChange={handleChange} />
              </div>
              <div className="flex gap-2">
                <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
                  <FaCity className="text-gray-400 mr-2" />
                  <input type="text" name="city" className="w-full p-2 outline-none" placeholder="City" value={formValues.city} onChange={handleChange} />
                </div>
                <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <input type="text" name="zip" className="w-full p-2 outline-none" placeholder="ZIP Code" value={formValues.zip} onChange={handleChange} />
                </div>
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaFlag className="text-gray-400 mr-2" />
                <input type="text" name="country" className="w-full p-2 outline-none" placeholder="Country" value={formValues.country} onChange={handleChange} />
              </div>
            </div>

            {/* Payment Information Header */}
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mt-6 mb-4">
              <FaInfoCircle className="text-blue-600" />
              <span>Payment Information</span>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4 flex gap-4">
              <button
                type="button"
                className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-lg ${
                  paymentMethod === "credit" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setPaymentMethod("credit")}
              >
                <FaCreditCard />
                Credit Card
              </button>
              <button
                type="button"
                className={`w-1/2 flex items-center justify-center gap-2 py-2 rounded-lg ${
                  paymentMethod === "paypal" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setPaymentMethod("paypal")}
                >
                  <FaPaypal />
                  PayPal
                </button>
              </div>
  
              {/* Credit Card Form */}
              {paymentMethod === "credit" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FaCreditCard className="text-gray-400 mr-2" />
                      <input type="text" name="cardNumber" className="w-full p-2 outline-none" placeholder="Card Number (xxxx xxxx xxxx xxxx)" value={formValues.cardNumber} onChange={handleCardNumberChange} />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <input type="text" name="expiryDate" className="w-full p-2 outline-none" placeholder="MM/YY" value={formValues.expiryDate} onChange={handleExpiryDateChange} />
                      </div>
                      <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
                        <FaLock className="text-gray-400 mr-2" />
                        <input type="text" name="cvv" className="w-full p-2 outline-none" placeholder="CVV" value={formValues.cvv} onChange={handleCVVChange} />
                      </div>
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FaUser className="text-gray-400 mr-2" />
                      <input type="text" name="cardholderName" className="w-full p-2 outline-none" placeholder="Cardholder Name" value={formValues.cardholderName} onChange={handleChange} />
                    </div>
  
                    {/* Display Errors */}
                    <div className="text-red-500 text-sm">
                      {Object.values(errors).map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
  
                    {/* Card Logos */}
                    <div className="flex justify-center gap-3 mt-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    </div>
                  </div>
  
                  {/* Confirm Payment */}
                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all" type="submit" disabled={isSubmitting}>
                    ✅ Place Order
                  </button>
                </form>
              )}
  
              {/* PayPal Option */}
              {paymentMethod === "paypal" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FaPaypalIcon className="text-gray-400 mr-2" />
                      <input type="email" name="paypalEmail" className="w-full p-2 outline-none" placeholder="PayPal Email Address" value={formValues.paypalEmail} onChange={handleChange} />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                      <FaLock className="text-gray-400 mr-2" />
                      <input type="password" name="paypalPassword" className="w-full p-2 outline-none" placeholder="PayPal Password" value={formValues.paypalPassword} onChange={handleChange} />
                    </div>
  
                    {/* Display Errors */}
                    <div className="text-red-500 text-sm">
                      {Object.values(errors).map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  </div>
  
                  {/* Confirm Payment */}
                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all" type="submit" disabled={isSubmitting}>
                    ✅ Pay Now
                  </button>
                </form>
              )}
  
              {/* Animation for approval */}
              {isSubmitting && (
                <div className="mt-4 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaCheckCircle className="text-green-600 text-5xl mb-2" />
              <span className="text-lg text-green-600">Payment Approved</span>
            </div>
          )}
  
          {/* Close Button */}
          {!isApproved && (
            <button className="mt-4 w-full py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default Checkout;
  