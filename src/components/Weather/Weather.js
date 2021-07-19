import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Weather.module.css"
import Modal from "../UI/Modal";

const Weather = (props) => {
  const cartCtx = useContext(CartContext);
  const cityInputRef = useRef();
  const [isError,setIsError] = useState(false)
  //const [cityChanged,setCityChanged] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)

  let { city } = cartCtx;

  const changeCurrentCityHandler = (newCity) => {
    cartCtx.changeCity(newCity);
  };

  useEffect(() => {
        
        
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ff10afdc787ae17e58f6628ddc3d849`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      if(!responseData.main){
        setIsError(true)
      //  let message1 = `${responseData.name} : ${(responseData.main.temp/10).toFixed(1)} C `;
      //console.log(responseData);
      //console.log(message1);
      //setMessage(message1);
      } else {
        setIsError(false)
      }
    }
    fetchWeather().catch((error) => {
      setIsError(true)
      //setSomeError(error.message);
    });
},[city])

  const submitHandler = () => {
    const enteredCity = cityInputRef.current.value;
    changeCurrentCityHandler(enteredCity);
    setSubmitClicked(true)
  };

  //let ErrorMessage = <div>Not found!!!</div>

  return (
    <Modal onClose={props.onClose}>
      <label htmlFor="city">Select Current City</label>
      <input className={classes.input} type="text" id="city" ref={cityInputRef} />
      <button className={classes.button} onClick={submitHandler}>Submit</button>
      {isError && submitClicked && <div>Not found!</div>}
      {!isError && submitClicked && <div>City Changed Successfully!</div>}
    </Modal>
  );
};

export default Weather;
