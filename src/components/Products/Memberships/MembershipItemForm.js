import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MembershipItemForm.module.css';

const MembershipItemForm = (props) => {
  const [durationIsValid, setDurationIsValid] = useState(true);
  const durationInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredDuration = durationInputRef.current.value;
    const enteredDurationNumber = +enteredDuration;

    if (
      enteredDuration.trim().length === 0 ||
      enteredDurationNumber < 1 ||
      enteredDurationNumber > 5
    ) {
      setDurationIsValid(false);
      return;
    }

    props.onAddToCart(enteredDurationNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={durationInputRef}
        label='Duration (Weeks)'
        input={{
          id: 'duration',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!durationIsValid && <p>Please enter a valid duration (1-5).</p>}
    </form>
  );
};

export default MembershipItemForm;
