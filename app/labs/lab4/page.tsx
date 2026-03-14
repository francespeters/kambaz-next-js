"use client"

import { Container } from "react-bootstrap";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import UrlEncoding from "./query-parameters";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./store";
import HelloRedux from "./redux/hello";

export default function Lab2() {
    function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
    <Container>
      <h2>Lab 4 -  Maintaining State in React Applications</h2>
      <ClickEvent/>
      <PassingDataOnEvent/>
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <UrlEncoding  />

      <Link href="lab4/redux">Redux Examples</Link>
      <HelloRedux/>
        <Link href="./lab4/react-context">React Context Examples</Link>
             <Link href="./lab4/zustand">Zustand Examples</Link>






    
    </Container>
    </Provider>
);
}