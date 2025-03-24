import React from "react";
import { Header } from "./Header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="h-[100vh] w-[100vw] select-none">
      <Header />
      <main className="w-full   py-2 max-w-[1400px] h-[calc(100vh-70px)]  mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
