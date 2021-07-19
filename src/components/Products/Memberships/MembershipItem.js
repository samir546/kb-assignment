import { useContext } from 'react';

import MembershipItemForm from './MembershipItemForm';

import classes from './MembershipItem.module.css';
import CartContext from '../../../store/cart-context';
import Card from '../../UI/Card';

const MembershipItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `Rs. ${props.price.toFixed(2)}`;

  const addToCartHandler = duration => {
    cartCtx.addProduct({
      id: props.id,
      name: props.name,
      duration: duration,
      price: props.price
    });
  };

  return (
    <Card>
    <div className={classes.membership}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MembershipItemForm onAddToCart={addToCartHandler} />
      </div>
    </div>
    </Card>
  );
};

export default MembershipItem;
