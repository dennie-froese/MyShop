import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Item from 'components/Item';

export default function App() {
  // https://my-json-server.typicode.com/benirvingplt/products/products

  return (
    <>
      <ScrollView style={styles.container}>
        <Item />
        <Item />
        <Item />
        <Item />
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
