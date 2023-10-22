index.js
--------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

App.js
-------
import { useState } from "react";
import React from "react";
import Header from "./Header";
import "./Style.css";
import Footer from "./Footer";
import Content from "./Content";
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";
const App = () => {
  const [list,setList] = useState(JSON.parse(localStorage.getItem("TO_DO_LIST")));

    const [addItems,setAddItems] = useState("");

    const [search,setSearch] = useState("");

    const newItems = (ele) => {
      const id = (list.length > 0) ? list[list.length -1].id + 1 : 1;
      const a = {id,task:ele,checked:false};
      const c = [...list,a];
      setList(c);
      localStorage.setItem("TO_DO_LIST",JSON.stringify(c));
    
    }
    

const changeCheck = (id) =>{
   const chCheck = list.map((ele) => (id === ele.id) ? {...ele, checked: !ele.checked} : ele);
   setList(chCheck);
   localStorage.setItem("TO_DO_LIST",JSON.stringify(chCheck));
}
const changeDelete = (id) =>{
    const chDelete = list.filter((ele) => (id === ele.id) ? null : ele);
    setList(chDelete);
    localStorage.setItem("TO_DO_LIST",JSON.stringify(chDelete));
}
const changeSubmit = (e) =>{
  e.preventDefault();
  newItems(addItems);
  setAddItems("");

}

  return <>
  <Header title = "To Do List"/>
  <AddItems 
  addItems= {addItems}
  setAddItems={setAddItems}
  changeSubmit={changeSubmit}
  />
  <SearchItems 
  search= {search}
  setSearch= {setSearch}
  />
  <Content 
  list = {list.filter((ele) => ((ele.task).toLowerCase()).includes(search.toLowerCase()))}
  changeCheck = {changeCheck}
  changeDelete = {changeDelete}
  />
  <Footer 
  length = {list.length}
  />
  
  </>
}
export default App;

SearchItems.js
---------------
import React from "react";
const SearchItems = ({search,setSearch}) => {

    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search:</label>
            <input id="search"
            placeholder="Search here"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}

            
            />
        </form>
        </>
    );
}
export default SearchItems;

AddItems.js
-----------
import React from "react";
import {FaRegPlusSquare}  from "react-icons/fa";
const AddItems = ({addItems,setAddItems,changeSubmit}) => {
    
    return (
        <>
        <form onSubmit={(e) => changeSubmit(e)}>
            <label htmlFor="additems">Add Items:</label>
            <input 
            id="additems"
            type="text"
            placeholder="Add Task"
            value={addItems}
            onChange={(e) => setAddItems(e.target.value)}
            required
            />
            <button type="submit">
            <FaRegPlusSquare />
            </button>
        </form>
        </>
    );
}
export default AddItems;


Style.css
----------
*{
    text-align: center;
}
.Contentul{
    list-style: none;
}

Header.js
----------
import React from "react";
const Header = ({title}) => {

    return (
    <>
    <h1 style={{color: "blue",backgroundColor: "skyblue"}}>{title}</h1>
    </>
    );
}
Header.defaultProps = {
    title : "To Do List Application"
}
export default Header;

Footer.js
----------
import React from "react";
const Footer = ({length}) => {
    
    return (
        <>
        <h4 style={{color: '#b30000',backgroundColor: "#ff9999"}}>{length} List {(length > 1) ? "Items" : "Item"}</h4>
        </>
    );
}
export default Footer;

Content.js
-----------
import React from "react";
import ListItems from "./ListItems";
const Content = ({list,changeCheck,changeDelete}) => {
    

                                                                                                                                                                                                                                                                        
return (   
    <>        
    {(list.length > 0) ?                                                                                 
    <ListItems 
    list = {list}
    changeCheck = {changeCheck}
    changeDelete = {changeDelete}
    />
    
    : <p>Your list is empty</p>
}
    </>
)
}
export default Content;

ListItems.js
-------------
import React from "react";

import EachList from "./EachList";
const ListItems = ({list,changeCheck,changeDelete}) => {

    return (
        <>
        <ul className="Contentul">
        {
            list.map((ele) => (
                <EachList 
                ele = {ele}
                key = {ele.id}
                changeCheck = {changeCheck}
                changeDelete = {changeDelete}
                />

            )
            )
        }
    </ul>
        </>
    );
}
export default ListItems;

EachList.js
-----------
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
const EachList = ({ele,changeCheck,changeDelete}) => {

    return <>
    <li key={ele.id}>
                    <input 
                    type="checkbox"
                    checked={ele.checked}                                                        
                    onChange={() => changeCheck(ele.id)}

                    />
                    <label onDoubleClick={() => changeCheck(ele.id)} style = {{textDecoration: (ele.checked  === true) ? "line-through" : "none"}}>{ele.task}</label>
                    <FaRegTrashAlt 
                    type="button"
                    onClick={() => changeDelete(ele.id)}
                    />
                </li>
    </>
}
export default EachList;
