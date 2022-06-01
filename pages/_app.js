import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import itemReducer from "./store/items";
import { createWrapper } from "next-redux-wrapper";
import Header from "../component/header";

const store = () =>
  configureStore({
    reducer: { itemReducer },
  });

const wrapper = createWrapper(store);

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </NextUIProvider>
  );
}

export default wrapper.withRedux(MyApp);
