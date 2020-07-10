import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Item from 'components/Item';

export default function App() {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  console.warn(products);

  return (
    <>
      <ScrollView style={styles.container}>
        {products
          ? products.map((product: any) => {
              return <Item product={product} />;
            })
          : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
});
