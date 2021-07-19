import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import fitnessImage from '../../assets/fit.jpg';
import classes from './Header.module.css';
import WeatherButton from './WeatherButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Fitovation</h1>
        <HeaderCartButton onClick={props.onShowCart} />
        <WeatherButton onClick={props.onShowWeather}></WeatherButton>
      </header>
      <div className={classes['main-image']}>
        <img src={fitnessImage} alt='Exrcising' />
      </div>
    </Fragment>
  );
};

export default Header;
