import classes from "./WeatherButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";



const WeatherButton = (props) => {
    const cartCtx = useContext(CartContext);
    const [someError, setSomeError] = useState();
    let { city } = cartCtx;
    //if(!city) city = 'Bengaluru'
    const [message, setMessage] = useState('')
    

    useEffect(() => {
        
        
        const fetchWeather = async () => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ff10afdc787ae17e58f6628ddc3d849`
          );
    
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const responseData = await response.json();
          if(responseData.main){
            let message1 = `${responseData.name} : ${(responseData.main.temp/10).toFixed(1)} C `;
          console.log(responseData);
          console.log(message1);
          setMessage(message1);
          }
        }
        fetchWeather().catch((error) => {
          setSomeError(error.message);
        });
    },[city])

    



  return (
    <button className={classes.button} onClick={props.onClick} displayError={someError}>
      
      <span>{message}</span>
      
    </button>
  );
};

export default WeatherButton;
