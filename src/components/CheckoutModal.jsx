
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CheckoutModal = forwardRef(function CheckoutModal({ cartItems, onClose }, ref) {
  const dialog = useRef();
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card',
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Order Placed:', {
      cartItems,
      customerDetails: formData,
    });
    alert('Order placed successfully! 🎉');
    dialog.current.close();
    onClose();
  }

  return createPortal(
    <dialog id="checkout-modal" ref={dialog} open>
      <h2>Checkout</h2>
      <div>
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
          </select>
        </label>
        <div>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Confirm Order</button>
        </div>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CheckoutModal;

