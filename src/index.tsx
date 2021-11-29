import App from './app';
import * as React from 'react';
import {createContext} from 'react';
import * as ReactDom from 'react-dom';
import Store from "./store/Store";

interface State {
    store: Store
}

const store = new Store()

export const Context = createContext<State>({
    store
})

let root = document.getElementById("root");
ReactDom.render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>
    , root);

