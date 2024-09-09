import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

// Importing images with the correct file paths
import cologne from './products/cologne.jpg';
import iwatch from './products/iwatch.jpg';
import mug from './products/mug.jpg';
import wallet from './products/wallet.jpg';

function App() {
  // Initialize state to keep track of product quantities
  const [quantities, setQuantities] = useState({
    cologne: 0,
    iwatch: 0,
    mug: 0,
    wallet: 0,
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Shop to React</h1>
        <FontAwesomeIcon icon={faShoppingCart} className="App-cart-icon" /><span>0 items</span>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="row">
             {/* Product 1 */}
            <div className="col-sm-8 d-flex">
              <p>Unisex Cologne</p>
              <img src={cologne} alt="Cologne" className="img-fluid" />
              <p className="ml-2 d-flex">Quantity: {quantities.cologne}</p>
            </div>
            
            {/* Product 2 */}
            <div className="col-sm-8 d-flex">
              <p>Apple iWatch</p>
              <img src={iwatch} alt="iWatch" className="img-fluid" />
              <p className="ml-2 d-flex">Quantity: {quantities.cologne}</p>
            </div>

            {/* Product 3 */}
            <div className="col-sm-8 d-flex">
              <p>Unique Mug</p>
              <img src={mug} alt="Cat Mug" className="img-fluid" />
              <p className="ml-2 d-flex">Quantity: {quantities.mug}</p>
            </div>
            
            {/* Product 4 */}
            <div className="col-sm-8 d-flex">
              <p>Mens Wallet</p>
              <img src={wallet} alt="Wallet" className="img-fluid" />
              <p className="ml-2 d-flex">Quantity: {quantities.wallet}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
