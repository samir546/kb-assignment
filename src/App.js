import { useState } from 'react';

import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Products from './components/Products/Products';
import Weather from './components/Weather/Weather';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [weatherCitySelectorShown, setWeatherCitySelectorShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const showWeatherCitySelectorHandler = () => {
    setWeatherCitySelectorShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const hideWeatherCitySelectorHandler = () => {
    setWeatherCitySelectorShown(false);
  };

  

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {weatherCitySelectorShown && <Weather onClose={hideWeatherCitySelectorHandler} />}
      <Header onShowCart={showCartHandler} onShowWeather={showWeatherCitySelectorHandler}/>
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
