import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Item, {Product} from 'components/Item';
import {useTotal, useDiscountApply} from 'hooks/useTotalContext';
import useFetch from 'hooks/useFetch';

export default function ItemList() {
  const [products, setProducts] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountApplied, setDiscountApplied] = useState('');
  const total = useTotal();
  const discountApply = useDiscountApply(20);
  const results = useFetch(
    'https://my-json-server.typicode.com/benirvingplt/products/products',
  );

  useEffect(() => {
    setProducts(results);
  }, [results]);

  const filter = () => {
    const filteredProducts: Product[] = products.filter((product: Product) => {
      return product.colour.toLowerCase().match('black');
    });
    setProducts(filteredProducts);
    setOpenFilter(false);
  };

  function remove(id: number) {
    const tempProductsReduced = products.filter(function (product: Product) {
      return product.id != id;
    });
    setProducts(tempProductsReduced);
  }

  function discountChecker() {
    if (discount === 'JULY20') {
      discountApply();
      setDiscountApplied(`Discount code ${discount} successfully applied!`);
    } else {
      setDiscountApplied(`Discount code ${discount} not valid!`);
    }
  }

  return (
    <>
      {!products ? (
        <View style={styles.container}>
          <Text>Oops - something went wrong!</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filter}
              onPress={() => setOpenFilter(!openFilter)}>
              <Text style={styles.text}>Colour filter</Text>
            </TouchableOpacity>
            {openFilter ? (
              <View>
                <TouchableOpacity onPress={filter}>
                  <Text>BLACK</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <ScrollView>
            {products
              ? products.map((product: Product) => {
                  return (
                    <Item
                      product={product ? product : null}
                      key={product.id}
                      remove={remove}
                    />
                  );
                })
              : null}
            <View style={styles.total}>
              <View style={styles.totalView}>
                <Text style={styles.text}>Total: £{total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.discountToggle}
                onPress={() => setOpenDiscount(!openDiscount)}>
                <Text style={styles.text}>Got a discount code?</Text>
              </TouchableOpacity>
              {openDiscount ? (
                <View style={styles.discount}>
                  <TextInput
                    style={styles.discountInput}
                    onChangeText={(text) => setDiscount(text)}
                    value={discount}
                    placeholder={'Enter your discount here :)'}
                  />
                  <TouchableOpacity onPress={discountChecker}>
                    <Text>Apply discount</Text>
                  </TouchableOpacity>
                  {discountApplied === '' ? null : (
                    <View>
                      <Text>{discountApplied}</Text>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          </ScrollView>
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
  discountToggle: {
    paddingTop: 20,
  },
  discount: {
    paddingTop: 10,
    width: '70%',
    alignItems: 'flex-end',
  },
  discountInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '80%',
    textAlign: 'center',
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
