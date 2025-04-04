
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckoutModal from './CheckoutModal';

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef();
  const checkoutModal = useRef();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  function handleCheckout() {
    setIsCheckoutOpen(true);
  }

  function handleCloseCheckout() {
    setIsCheckoutOpen(false);
  }

  return createPortal(
    <>
      <dialog id="modal" ref={dialog}>
        <h2>{title}</h2>
        <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
        <form method="dialog" id="modal-actions">
          {actions}
          {cartItems.length > 0 && (
            <button type="button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          )}
        </form>
      </dialog>

      {isCheckoutOpen && (
        <CheckoutModal
          ref={checkoutModal}
          cartItems={cartItems}
          onClose={handleCloseCheckout}
        />
      )}
    </>,
    document.getElementById('modal')
  );
});

export default CartModal;






