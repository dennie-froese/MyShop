import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {TotalProvider} from 'hooks/useTotalContext';
import ItemList from 'components/ItemList';

export default function App() {
  return (
    <>
      <TotalProvider>
        <ItemList />
      </TotalProvider>
    </>
  );
}

const styles = StyleSheet.create({});
