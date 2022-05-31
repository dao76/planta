import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './src/screens/navigation/Navigation';
import { UserConTextProvider } from './src/screens/user/UserConText';
import { ProductContextProvider } from './src/screens/product/ProductContext'

export default function App() {
  return (
    <UserConTextProvider>
      <ProductContextProvider>
        <Navigation />
      </ProductContextProvider>
    </UserConTextProvider>
  );
}
