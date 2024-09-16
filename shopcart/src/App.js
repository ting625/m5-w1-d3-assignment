import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faShoppingCart, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import cologne from './products/cologne.jpg';
import iwatch from './products/iwatch.jpg';
import mug from './products/mug.jpg';
import wallet from './products/wallet.jpg';

function App() {
  const [quantities, setQuantities] = useState({
    cologne: 0,
    iwatch: 0,
    mug: 0,
    wallet: 0,
  });
  const [lightboxProduct, setLightboxProduct] = useState(null); // Lightbox state
  const [viewCart, setViewCart] = useState(false); // Cart view state

  const handleQuantityChange = (product, value) => {
    if (value >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [product]: value,
      }));
    }
  };

  const handleIncrement = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: prev[product] + 1,
    }));
  };

  const handleDecrement = (product) => {
    if (quantities[product] > 0) {
      setQuantities((prev) => ({
        ...prev,
        [product]: prev[product] - 1,
      }));
    }
  };

  const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr, 0);

  const products = [
    { name: 'Unisex Cologne', img: cologne, key: 'cologne' },
    { name: 'Apple iWatch', img: iwatch, key: 'iwatch' },
    { name: 'Unique Mug', img: mug, key: 'mug' },
    { name: 'Mens Wallet', img: wallet, key: 'wallet' },
  ];

  const cartItems = products.filter(product => quantities[product.key] > 0);

  return (
    <div className="App">
      <header className="App-header bg-info text-black p-3 d-flex justify-content-between align-items-center">
        <h1 className="App-title" onClick={() => setViewCart(false)}>Shop 2 React</h1>
        <div className="align-items-center" onClick={() => setViewCart(true)}>
          <FontAwesomeIcon icon={faShoppingCart} className="App-cart-icon mr-2" />
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>
      </header>

      <main className="App-main py-4">
        <div className="container">
          {viewCart ? (
            <div className="cart-view">
              <h2>Your Cart Items</h2>
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <div key={product.key} className="d-flex justify-content-between align-items-center border p-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <span>{product.name}</span>
                    <span>Quantity: {quantities[product.key]}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.key} className="col-sm-12 d-flex border p-3 align-items-center text-center">
                  <div className="col-md-5">
                    <p className="font-weight-bold">{product.name}</p>
                    <img
                      src={product.img}
                      alt={product.name}
                      className="img-fluid rounded"
                      onClick={() => setLightboxProduct(product)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="ml-3 d-flex align-items-center">
                    <button onClick={() => handleDecrement(product.key)} className="btn btn-outline-secondary mr-2">
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{quantities[product.key]}</span>
                    <button onClick={() => handleIncrement(product.key)} className="btn btn-outline-secondary ml-2">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox for product info */}
      {lightboxProduct && (
        <div className="lightbox" onClick={() => setLightboxProduct(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxProduct(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>{lightboxProduct.name}</h2>
            <img src={lightboxProduct.img} alt={lightboxProduct.name} className="img-fluid" />
            <p>Some details about {lightboxProduct.name}...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
