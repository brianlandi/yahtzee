import React, { useEffect, useState } from "react";

const Die = ({ roll, index, toggleRollable, playerTurn }) => {
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

  return (
    <div className={dieClasses} onClick={handleClickEvent}>
      <h1>{roll}</h1>
      <p>{rollable.toString()}</p>
    </div>
  );
};

export default Die;
