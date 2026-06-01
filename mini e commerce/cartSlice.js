import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        });
      }
      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;
      state.totalPrice -= item.price;
      if (item.quantity <= 1) {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    deleteItem: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;
      state.totalPrice -= item.price * item.quantity;
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
