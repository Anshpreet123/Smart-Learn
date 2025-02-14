import React from 'react';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition"
    >
      {props.name}
    </button>
  );
};
export default Button;
