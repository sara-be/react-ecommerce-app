import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, getCartCount, getCartTotal } = useCart();

  const formatPrice = (priceCents) => {
    return (priceCents / 100).toFixed(2);
  };

  const calculateTax = (total) => {
    return (total * 0.1).toFixed(2);
  };

  const cartTotal = getCartTotal();
  const tax = calculateTax(cartTotal);
  const shippingCost = cart.length > 0 ? 999 : 0; // $9.99 shipping
  const orderTotal = cartTotal + parseInt(tax) + shippingCost;

  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/" className="header-link">
              <img className="logo" src="/logo.png" />
              <img className="mobile-logo" src="/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">{getCartCount()} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.length === 0 ? (
              <div className="cart-item-container">
                <div className="product-name">
                  Your cart is empty. <Link to="/">Continue shopping</Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={`/${item.image}`} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {item.name}
                      </div>
                      <div className="product-price">
                        ${formatPrice(item.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{item.quantity}</span>
                        </span>
                        <span 
                          className="update-quantity-link link-primary"
                          onClick={() => {
                            const newQty = prompt(`Update quantity for ${item.name}:`, item.quantity);
                            if (newQty) {
                              updateQuantity(item.id, parseInt(newQty));
                            }
                          }}
                        >
                          Update
                        </span>
                        <span 
                          className="delete-quantity-link link-primary"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      <div className="delivery-option">
                        <input type="radio" defaultChecked
                          className="delivery-option-input"
                          name={`delivery-option-${item.id}`} />
                        <div>
                          <div className="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div className="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${item.id}`} />
                        <div>
                          <div className="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div className="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${item.id}`} />
                        <div>
                          <div className="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div className="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({getCartCount()}):</div>
              <div className="payment-summary-money">${formatPrice(cartTotal)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${formatPrice(shippingCost)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${formatPrice(cartTotal + shippingCost)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${tax}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${formatPrice(orderTotal)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
