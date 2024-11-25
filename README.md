# rn-challenge-goWish

## RN Assignment

This repository contains the implementation of the `rn-challenge-goWish` React Native application. This challenge was designed to evaluate the ability to handle large datasets, implement efficient pagination, and manage reactive filtering while ensuring high performance and usability.

## The Challenge

Build a **Product List Screen**. This screen should display a large list of products, support infinite scrolling (pagination), and allow users to filter products by category using a Picker from **react-native-picker/picker** dependency.

### Dataset

The dataset includes 10,000 mock products spread across various categories, requiring the application to handle significant amounts of data efficiently.

### Requirements

#### Pagination

✔ Display products in chunks of 20-50 items.

✔ Implement infinite scrolling to fetch more items as the user reaches the end of the list.

✔ Ensure there is no duplicate loading of items.

#### Reactive Filtering

✔ Incorporate a item picker at the top of the screen to filter products by category.

✔ Reset pagination when a filter is applied.

✔ Use React hooks like `useEffect` to manage filtering and pagination logic reactively.

#### Performance Optimization

✔ I have used React Native's `FlatList` for efficient list rendering.

✔ Employ optimizations such as `keyExtractor`, `getItemLayout`, to enhance scrolling performance and reduce unnecessary re-renders of single items.

✔ Prevent rendering issues or jank during scrolling by strategically managing state and component lifecycles.

#### Error Handling

- Gracefully handle edge cases:
  - Display a message for empty states when no products match the filter. Added a fake filter to test that.
  - Mock error scenarios during data fetching to simulate timeouts or random failures, by setting a Random check.

## Implementation Details

- **`ProductListScreen.tsx`**: Manages the display of products and integrates infinite scrolling and dynamic filtering.
- **`CategoryFilter.tsx`**: Handles the UI and logic for product category filtering.
- **`ProductCard.tsx`**: Renders individual product details.
- **Utilities**:
  - **`fetchMockProducts.ts`**: Simulates fetching products from a backend.
  - **`extractCategories.ts`**: Extracts unique categories from the product list for the filter options.

## Submission

- This solution has been pushed to a public GitHub repository.
- The repository includes this README explaining the feature implementations, any assumptions or trade-offs made, and details on performance optimizations.
- The application has been tested to ensure smooth operation on both iOS and Android platforms.

## How to Start

1. **Clone the repository:**

   ```git clone https://github.com/HackAsh96/rn-challenge-goWish.git```
2. **Install dependencies using NPM**

   ```npm install```
3. **This project is using expo**
   - Download the Expo Go app on your mobile (iOS/Android)
   - Tune in on the same wifi on both devices (Computer and Device)
   - Execute ```npm start``` to start the project

***NOTE:***

If there you encounter issues with the Wifi or impossible to be on the same connection via LAN, please consider TUNNELING, see process on how to on the Expo guidelines: [Expo tunneling](https://docs.expo.dev/more/expo-cli/#tunneling)
