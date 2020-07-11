import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Item, {Product} from 'components/Item';

export default function App() {
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const filter = () => {
    let filteredProducts: Product[] = products.filter((product: Product) => {
      return product.colour.toLowerCase().match('black');
    });
    setProducts(filteredProducts);
    setOpen(false);
  };

  function increment(n: number, c: string){
    c === 'plus' ? 
    setTotal(total + n) :
    setTotal(total - n)
  }

  return (
    <>
      {!products ? (
        <Text>Oops - something went wrong!</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filter}
              onPress={() => setOpen(!open)}>
              <Text style={styles.text}>Colour filter</Text>
            </TouchableOpacity>
            {open ? (
              <View>
                <TouchableOpacity onPress={filter}>
                  <Text>BLACK</Text>
                </TouchableOpacity>

                <Text>RED</Text>
                <Text>STONE</Text>
              </View>
            ) : null}
          </View>
          <ScrollView>
            {products
              ? products.map((product: Product) => {
                  return (
                    <Item product={product ? product : null} key={product.id} increment={increment} />
                  );
                })
              : null}
          </ScrollView>
          <View style={styles.total}>
            <View style={styles.totalView}>
              <Text style={styles.text}>Total: {total.toFixed(2)}£</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  filterContainer: {
    width: 100,
    marginLeft: 30,
  },
  filter: {
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
  total: {
    flex: 4,
    alignItems: 'flex-end',
    marginRight: 30,
  },
  totalView: {
    borderTopWidth: 2,

    borderColor: 'black',
  },
});
