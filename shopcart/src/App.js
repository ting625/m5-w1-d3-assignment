import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faShoppingCart, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import cologne from './products/cologne.jpg';
import iwatch from './products/iwatch.jpg';
import mug from './products/mug.jpg';
import wallet from './products/wallet.jpg';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-bootstrap';

function App() {
  const [quantities, setQuantities] = useState({
    cologne: 0,
    iwatch: 0,
    mug: 0,
    wallet: 0,
  });
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [viewCart, setViewCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State to control showing the login component
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

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
    const newValue = Math.max(0, parseInt(value) || 0);
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

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      setShowLogin(false); // Close login on success
    } else {
      setLogin(false);
    }
  };

  const handleCheckout = () => {
    setShowLogin(true); // Show login form and Facebook login on checkout
  };

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

      {!login &&
      <React.Fragment>
        {showLogin ? (
          <div className="container mt-4">
            <Card style={{ width: '800px' }} className="mx-auto">
              <Card.Header className="pb-4">
                <h1>Sign In</h1>
              </Card.Header>
              <Card.Body>
                <LoginForm/>
                <Card.Text>
                  <FacebookLogin
                    appId="1230986128111636"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile"
                    callback={responseFacebook}
                    icon="fa-facebook"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div ClassName="container mt-4">
            <main className="App-main py-4">
              <div className="container">
                {viewCart ? (
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
                        {/* Add Check Out button when cart has items */}
                        <button className="btn btn-primary mt-3" onClick={handleCheckout}>
                          Check Out
                        </button>
                      </>
                    ) : (
                      <>
                        <p>There are {totalItems} items in your cart.</p>
                        <button className="btn btn-success mt-3" onClick={() => setViewCart(false)}>
                          Continue Shopping
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="row">
                    {products.map((product) => (
                      <div key={product.key} className="col-12 d-flex align-items-center border p-3">
                        <div className="product-image col-md-2">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                            onClick={() => setLightboxProduct(product)}
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
              </div>
            </main>

            {/* Lightbox for product info */}
            {lightboxProduct && (
              <div className="lightbox" onClick={() => setLightboxProduct(null)} style={styles.lightbox}>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()} style={styles.lightboxContent}>
                  <button className="lightbox-close" onClick={() => setLightboxProduct(null)} style={styles.closeButton}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <h2>{lightboxProduct.name}</h2>
                  <img src={lightboxProduct.img} alt={lightboxProduct.name} className="img-fluid" style={styles.lightboxImg} />
                  <p>Ratings about {lightboxProduct.name}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
      }

      {/* Render Home component if logged in */}
      {login && 
      <div className="container mt-4">
        <Card style={{ width: '800px' }} className="mx-auto">
          <Card.Header className="pb-4">
            <h1>Check Out</h1>
          </Card.Header>
        <Home fbpic={picture} fbdata={data} />
        </Card>
      </div>
      }

    </div>
  );
}

function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  );
}

function Home({ fbpic, fbdata }) {
  return (
    <React.Fragment>
      <img id="fb_pic" src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">Time to check out?</p>
    </React.Fragment>
  );
}

const styles = {
  lightbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  lightboxContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    maxWidth: '600px',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  lightboxImg: {
    width: '100%',
    height: 'auto',
  },
};

export default App;
