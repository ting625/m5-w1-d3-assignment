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

  // Function to update the quantity of a product
  const handleQuantityChange = (product, value) => {
    if (value >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [product]: value,
      }));
    }
  };

  // Calculate total items in cart
  const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="App">
      <header className="App-header bg-info text-white p-3">
        <h1 className="App-title">Shop to React</h1>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="App-cart-icon mr-2" />
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>
      </header>

      <main className="App-main py-4">
        <div className="container">
          <div className="row">
            {/* Product 1 */}
            <div className="col-sm-12 d-flex border p-3 align-items-center">
              <div className="flex-grow-1">
                <p className="font-weight-bold">Unisex Cologne</p>
                <img src={cologne} alt="Cologne" className="img-fluid rounded" />
              </div>
              <div className="ml-3 d-flex align-items-center">
                <input 
                  type="number" 
                  min="0" 
                  value={quantities.cologne} 
                  onChange={(e) => handleQuantityChange('cologne', parseInt(e.target.value))}
                  className="form-control w-50 mr-2" 
                />
                <p className="mb-0">quantity</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-sm-12 d-flex border p-3 align-items-center">
              <div className="flex-grow-1">
                <p className="font-weight-bold">Apple iWatch</p>
                <img src={iwatch} alt="iWatch" className="img-fluid rounded" />
              </div>
              <div className="ml-3 d-flex align-items-center">
                <input 
                  type="number" 
                  min="0" 
                  value={quantities.iwatch} 
                  onChange={(e) => handleQuantityChange('iwatch', parseInt(e.target.value))}
                  className="form-control w-50 mr-2" 
                />
                <p className="mb-0">quantity</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-sm-12 d-flex border p-3 align-items-center">
              <div className="flex-grow-1">
                <p className="font-weight-bold">Unique Mug</p>
                <img src={mug} alt="Cat Mug" className="img-fluid rounded" />
              </div>
              <div className="ml-3 d-flex align-items-center">
                <input 
                  type="number" 
                  min="0" 
                  value={quantities.mug} 
                  onChange={(e) => handleQuantityChange('mug', parseInt(e.target.value))}
                  className="form-control w-50 mr-2" 
                />
                <p className="mb-0">quantity</p>
              </div>
            </div>

            {/* Product 4 */}
            <div className="col-sm-12 d-flex border p-3 align-items-center">
              <div className="flex-grow-1">
                <p className="font-weight-bold">Mens Wallet</p>
                <img src={wallet} alt="Wallet" className="img-fluid rounded" />
              </div>
              <div className="ml-3 d-flex align-items-center">
                <input 
                  type="number" 
                  min="0" 
                  value={quantities.wallet} 
                  onChange={(e) => handleQuantityChange('wallet', parseInt(e.target.value))}
                  className="form-control w-50 mr-2" 
                />
                <p className="mb-0">quantity</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
