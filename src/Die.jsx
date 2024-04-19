import React, { useEffect, useState } from "react";
// import { ReactComponent as One } from "../src/assets/one.svg";
import one from "../src/assets/one.svg";
import two from "../src/assets/two.svg";
import three from "../src/assets/three.svg";
import four from "../src/assets/four.svg";
import five from "../src/assets/five.svg";
import six from "../src/assets/six.svg";

const Die = ({ roll, index, toggleRollable, playerTurn, rollsRemaining }) => {
  const handleClickEvent = () => {
    const updatedRollable = !rollable;
    setRollable(updatedRollable);
    toggleRollable(index, updatedRollable);
  };

  const [rollable, setRollable] = useState(true);

  const dieClasses = `die ${rollable ? "rollable" : "hold"}`;

  useEffect(() => {
    setRollable(true);
  }, [playerTurn]);

  const dieMapping = [one, two, three, four, five, six];

  return (
    <div className={dieClasses} onClick={handleClickEvent}>
      {/* <h1>{roll}</h1> */}
      {/* <p>{rollable.toString()}</p> */}
      {rollsRemaining !== 3 && <img src={dieMapping[roll - 1]} alt='one' />}
    </div>
  );
};

export default Die;
