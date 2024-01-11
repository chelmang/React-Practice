import logo from './logo.svg';
import './App.css';
import React , {Component} from "react";
import Products from './components/Products'
import {render} from "@testing-library/react";

class App extends Component {
    render(){
        return (
           <Products/>
        );
    }

}

export default App;
