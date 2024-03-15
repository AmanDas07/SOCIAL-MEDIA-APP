'use client'

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import RootLayout from "./layout.js";
import { useContext } from "react";

import { userContext } from "../../context/page.js";


export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [state, setState] = useContext(userContext)
  return (
    <>


      <h1 className="text-success d-flex text-align-center justify-content-center" >My App</h1>
      <h1>{JSON.stringify(state)}</h1>
    </>



  );
}
