# MyShop
React Native mobile app to display a basic basket page listing products.

To run the app:
From your terminal and inside the project folder, execute react-native run-android for Android or react-native run-ios for iOS.


This application displays a basic product listing/ basket page, getting data via a fetch() call from an api.

The main logic lives in the App.tsx file that calls the api and also holds all the functional logic to 

1) Display the items fetched from the api by mapping over them and returning a custom <Item/> component.
2) Filter items by colour using a .filter() function and updating the product state with the filtered products.
3) Adding items to the cart and incrementing the basket quantity for the specific item, updating the total amount in the App state.
4) Reducing the quantity of an item and updating the total amount in the App state.
5) Removing items from the basket by using the filter() function and updating the product state with the filtered products.
