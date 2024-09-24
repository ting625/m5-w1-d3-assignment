import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import cologne from './products/cologne.jpg';
import iwatch from './products/iwatch.jpg';
import mug from './products/mug.jpg';
import wallet from './products/wallet.jpg';

// Login Form Component
function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">  
      <label className="m-2"> Name: </label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2"> Email: </label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  );
}

/*
// Home Component after login (Facebook or Manual)
function Home({ fbpic, fbdata }) {
  return (
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  );
}
*/  

function App() {
  const [login, setLogin] = useState(false);  // Set up login
  const [data, setData] = useState({});       // Set up data
  const [picture, setPicture] = useState(''); // Set up fb profile image
  const [quantities, setQuantities] = useState({
    cologne: 0,
    iwatch: 0,
    mug: 0,
    wallet: 0,
  });
  const [viewCart, setViewCart] = useState(false); // Cart view state
  const [lightboxProduct, setLightboxProduct] = useState(null); // Lightbox state

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
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

  const handleInputChange = (product, value) => {
    const newValue = Math.max(0, parseInt(value) || 0); // Ensure quantity is not negative
    setQuantities((prev) => ({
      ...prev,
      [product]: newValue,
    }));
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
        <h1 className="App-title" onClick={() => setViewCart(false)} style={{ cursor: 'pointer' }}>
          Shop 2 React
        </h1>
        <div className="align-items-center d-flex" onClick={() => setViewCart(true)} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faShoppingCart} className="App-cart-icon mr-2" />
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>
      </header>

      <main className="App-main py-4">
        <div className="container">
          {!login && (
            <Card style={{ width: '800px' }} className="mx-auto mt-5">
              <Card.Header className="pb-4">
                <h2>Sign In</h2>
              </Card.Header>
              <Card.Body>
                <h3>Please login using one of the following:</h3>
                <LoginForm />
                <FacebookLogin
                  appId="1230986128111636"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </Card.Body>
            </Card>
          )}

          {login && !viewCart && (
            <div className="row">
              {products.map((product) => (
                <div key={product.key} className="col-12 d-flex align-items-center border p-3">
                  <div className="product-image col-md-2">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                      onClick={() => setLightboxProduct(product)} // Trigger lightbox
                    />
                  </div>
                  <div className="product-details col-md-4">
                    <p className="font-weight-bold">{product.name}</p>
                  </div>
                  <div className="product-quantity d-flex align-items-center col-md-6 justify-content-end">
                    <div className="quantity-control d-flex align-items-center">
                      <button onClick={() => handleDecrement(product.key)} className="btn btn-secondary">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="number"
                        value={quantities[product.key]}
                        onChange={(e) => handleInputChange(product.key, e.target.value)}
                        className="form-control mx-2 text-center"
                        style={{ width: '60px' }}
                        min="0"
                      />
                      <button onClick={() => handleIncrement(product.key)} className="btn btn-secondary">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {login && viewCart && (
            <div className="cart-view">
              <h2>Your Cart Items</h2>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((product) => (
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
                  ))}
                  <button className="btn btn-primary mt-3" onClick={() => alert("Proceeding to checkout...")}>
                    Check Out
                  </button>
                </>
              ) : (
                <>
                  <p>Your cart is empty.</p>
                  <button className="btn btn-success mt-3" onClick={() => setViewCart(false)}>
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          )}

          {/* Lightbox for product info */}
          {lightboxProduct && (
            <div className="lightbox" onClick={() => setLightboxProduct(null)} style={styles.lightbox}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={styles.lightboxContent}>
                <button className="lightbox-close" onClick={() => setLightboxProduct(null)} style={styles.closeButton}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>{lightboxProduct.name}</h2>
                <img src={lightboxProduct.img} alt={lightboxProduct.name} className="img-fluid" style={styles.lightboxImg} />
                <p className="text-muted">Product description and details go here...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  lightboxContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    textAlign: 'center',
  },
  lightboxImg: {
    maxWidth: '100%',
    marginBottom: '20px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
  },
};

export default App;
