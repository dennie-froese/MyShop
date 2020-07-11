import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export type Product = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
};
interface Props {
  product: Product;
  increment: (n: number, c: string) => void;
}

export default function Item({product, increment}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: product.img}} />
      </View>
      <View style={styles.containerRight}>
        <View style={styles.header}>
          <Text>{product.name}</Text>
        </View>
        <View style={styles.details}>
          <Text>{product.price}£</Text>
          <View style={styles.containerQuantity}>
            <TouchableOpacity onPress={()=> increment(product.price, 'plus')} style={styles.increment}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Text style={styles.text}>0</Text>
            <TouchableOpacity onPress={()=> increment(product.price, 'minus')} style={styles.increment}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 65,
    height: 65,
  },
  containerRight: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
  },
  details: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
  },
  containerQuantity: {
    // flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
  increment: {
    width: 30,
    height: 30,
  },
});
