import React from 'react';
import Card from '../card/Card';

const CardContainer = () => {
  return (
    <div className="container flex-row gap-4 mx-auto mt-10 md:grid md:grid-cols-2 lg:grid-cols-3">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardContainer;
