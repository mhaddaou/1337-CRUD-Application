"use client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { store } from "./lib/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}
