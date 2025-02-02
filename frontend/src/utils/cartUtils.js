export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state, action) => {
    state.itemsprice =   addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  
    state.shippingPrice = addDecimals(state.itemsprice > 100 ? 0 : 10);

    state.taxPrice = addDecimals(Number((0.15 * state.itemsprice).toFixed(2)));


    state.totalPrice = addDecimals(state.itemsprice + state.shippingPrice + state.taxPrice);

    localStorage.setItem("cart", JSON.stringify(state));
}

