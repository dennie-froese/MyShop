import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useIncDec} from 'hooks/useTotalContext';

export type Product = {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
};
interface Props {
  product: Product;
  remove: (id: number) => void;
}

export default function Item({product, remove}: Props) {
  const [itemCount, setItemCount] = useState(0);
  const {inc, dec} = useIncDec(product.price);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: product.img}} />
      </View>
      <View style={styles.containerRight}>
        <View>
          <Text>{product.name}</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.priceContainter}>
            <Text>£{product.price}</Text>
          </View>
          <View style={styles.containerRightRight}>
            <View style={styles.containerQuantity}>
              <TouchableOpacity
                onPress={() => {
                  inc(), setItemCount((prev) => prev + 1);
                }}
                style={styles.increment}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
              <Text style={styles.text}>{itemCount}</Text>
              <TouchableOpacity
                onPress={() => {
                  dec(), setItemCount((prev) => prev - 1);
                }}
                style={styles.increment}>
                <Text style={styles.text}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => remove(product.id)}>
              <Text style={styles.text}>Remove</Text>
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
  priceContainter: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  containerRightRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
  },
  containerQuantity: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
  increment: {
    width: 30,
  },
});
