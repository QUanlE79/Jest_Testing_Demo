import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [shoesData, setShoesData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0.00);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    if (storedCartData && storedTotalAmount) {
      setCardData(JSON.parse(storedCartData));
      setTotalAmount(parseFloat(storedTotalAmount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cardData));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
  }, [cardData, totalAmount]);

  useEffect(() => {
    fetch('/data/shoes.json')
      .then(response => response.json())
      .then(data => {
        setShoesData(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);
  const handleAddToCart = (shoe) => {
    shoe.amount = 1;
    setCardData(prevCardData => [...prevCardData, shoe]);
    setTotalAmount(prevTotalAmount => prevTotalAmount + shoe.price);
  };
  const increaseAmount = (shoe) => {
    const updatedCardData = cardData.map(item => {
      if (item.id === shoe.id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setCardData(updatedCardData);
    setTotalAmount(prevTotalAmount => prevTotalAmount + shoe.price);
  };

  const decreaseAmount = (shoe) => {
    const updatedCardData = cardData.map(item => {
      if (item.id === shoe.id) {
        const updatedAmount = item.amount - 1;
        return { ...item, amount: updatedAmount >= 1 ? updatedAmount : 1 };
      }
      return item;
    });

    if (shoe.amount === 1) {
      removeProduct(shoe);
    } else {
      setCardData(updatedCardData);
      setTotalAmount(prevTotalAmount => prevTotalAmount - shoe.price);
    }
  };

  const removeProduct = (shoe) => {
    const updatedCardData = cardData.filter(item => item.id !== shoe.id);
    setCardData(updatedCardData);
    setTotalAmount(prevTotalAmount => prevTotalAmount - (shoe.price * shoe.amount));
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem('cartData');
      localStorage.removeItem('totalAmount');
    };
  }, []);
  return (
    <div className="App">
      <div className="wave-animation"></div>
      <div className="container">
        <div className="product-section">
          <div className="card">
            <div className="card-corner"></div>
            <div style={{ margin: '12px 0', position: 'relative' }}>
              <img className="logo-nike" src="/assets/nike.png"></img>
            </div>
            <div className="product-header">Our Products</div>
            {shoesData ? (
              <div className="shoe-elements">
                {shoesData.shoes.map(shoe => (
                  <div className="shoe-item" key={shoe.id}>
                    <div className="shoe-image-container" style={{ backgroundColor: shoe.color }}>
                      <img src={shoe.image} alt={shoe.name} />
                    </div>
                    <h3 className="shoe-name">{shoe.name}</h3>
                    <div className="shoe-desc">{shoe.description}</div>
                    <div className="shoe-bottom">
                      <div data-testid="shoe-price" className="shoe-price">${shoe.price}</div>
                      <div >
                        {cardData.some(item => item.id === shoe.id) ? (
                          <p data-testid="shoe-add-btn" className="shoe-added">
                            <img src="/assets/check.png" alt="Done" />
                          </p>
                        ) : (
                          <p data-testid="shoe-add-btn" className="shoe-add-btn" onClick={() => handleAddToCart(shoe)}>
                            ADD TO CART
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
        <div className="cart-section">
          <div className="card">
            <div className="card-corner"></div>
            <div style={{ margin: '12px 0', position: 'relative' }}>
              <img className="logo-nike" src="/assets/nike.png"></img>
            </div>
            <div className="product-header">Your cart
              <span data-testid="total-price" className="total-price" style={{ float: "right" }}>
                {totalAmount !== null && totalAmount !== undefined ? (
                  <div>${totalAmount.toFixed(2)}</div>
                ) : (
                  <div>$0.00</div>
                )}
              </span>
            </div>
            <div className="cart-body">
              {cardData.length === 0 ? (
                <div className="cart-empty-noti">Your cart is empty.</div>
              ) : (

                <div className="products-info">
                  {cardData.map(shoe => (
                    <div className="shoe-cart-item" key={shoe.id}>
                      <div className="shoe-cart-image-container" style={{ backgroundColor: shoe.color }}>
                        <img src={shoe.image} alt={shoe.name} />
                      </div>
                      <div className="shoe-cart-right">
                        <h3 className="shoe-cart-name">{shoe.name}</h3>
                        <div className="shoe-cart-price">${shoe.price}</div>
                        <div class="action">
                          <div class="amount">
                            <div class="minus" onClick={() => decreaseAmount(shoe)}>-</div>
                            <div class="num">{shoe.amount}</div>
                            <div class="add" onClick={() => increaseAmount(shoe)}>+</div>
                          </div>
                          <div data-testid="remove" class="remove" onClick={() => removeProduct(shoe)}>
                            <img src="/assets/trash.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
