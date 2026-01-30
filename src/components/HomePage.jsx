import { Link } from "react-router-dom";
import { products } from "../utils/data/products";
import { useCart } from "../context/CartContext";

const HomePage = () => {
    const { addToCart, getCartCount } = useCart();

    const getRatingImage = (stars) => {
        if (stars === 4.5) return "/ratings/rating-45.png";
        if (stars === 4) return "/ratings/rating-40.png";
        if (stars === 5) return "/ratings/rating-50.png";
        if (stars === 3.5) return "/ratings/rating-35.png";
        if (stars === 3) return "/ratings/rating-30.png";
        return "/ratings/rating-40.png";
    };

    const formatPrice = (priceCents) => {
        return (priceCents / 100).toFixed(2);
    };

    const handleAddToCart = (product, quantity) => {
        addToCart(product, parseInt(quantity));
    };

    return (
        <>
            <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="/logo-white.png" />
          <img className="mobile-logo"
            src="/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/icons/cart-icon.png" />
          <div className="cart-quantity">{getCartCount()}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>

    <div className="home-page">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src={`/${product.image}`} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {product.name}
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src={getRatingImage(product.rating.stars)} />
              <div className="product-rating-count link-primary">
                {product.rating.count}
              </div>
            </div>

            <div className="product-price">
              ${formatPrice(product.priceCents)}
            </div>

            <div className="product-quantity-container">
              <select id={`qty-${product.id}`}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="/icons/checkmark.png" />
              Added
            </div>

            <button 
              className="add-to-cart-button button-primary"
              onClick={() => {
                const quantity = document.getElementById(`qty-${product.id}`).value;
                handleAddToCart(product, quantity);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
        </>
    );
}

export default HomePage;
