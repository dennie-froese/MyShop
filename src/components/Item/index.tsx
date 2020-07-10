import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Item() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text>Image</Text>
      </View>
      <View style={styles.containerRight}>
        <View style={styles.header}>
          <Text>Item name</Text>
        </View>
        <View style={styles.details}>
          <Text>£ price</Text>
          <View style={styles.containerQuantity}>
            <Text>+</Text>
            <Text>QTY</Text>
            <Text>-</Text>
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
  containerRight: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
  },
  containerQuantity: {
    flexDirection: 'row',
  },
});
