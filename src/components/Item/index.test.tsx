import TestRenderer from 'react-test-renderer';
import React from 'react';
import Item from '.';

const product = {
  id: 10,
  colour: 'blue',
  name: 'Top',
  price: 7,
  img: 'string',
};

describe('Item', () => {
  it('renders', () => {
    expect(
      TestRenderer.create(
        <Item product={product} increment={jest.fn()} remove={jest.fn()} />,
      ).toJSON(),
    ).toMatchSnapshot();
  });
});
