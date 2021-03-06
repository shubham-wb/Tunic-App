import React, { useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import searchIco from "../assets/images/search.svg";
import close from "../assets/images/close.svg";
import Cart from "./Cart";
import { connect } from "react-redux";
import { fetchProducts, search, sortByGender } from "../utilities";

function Navbar(props) {
  let [value, setValue] = useState("");
  let [showCart, setShowCart] = useState(false);
  let count = 0;
  //function to implement enter in search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchQuery();
    }
  };
  //function to control state of search bar
  const handleChange = (event) => {
    setValue((value = event.target.value));
  };
  //function to submit search query
  const handleSearchQuery = () => {
    if (value === " " || value === "") {
      return;
    }
    let output = search(value, fetchProducts());
    props.data(output);
  };
  //function to show/hide cart
  const handleShowCart = () => {
    setShowCart((prev) => !prev);
  };

  if (props.cart.length !== 0) {
    props.cart.map((elem) => {
      count = count + elem.count;
    });
  }

  //Filter By Gender
  let [gender, setGender] = useState();

  const handleGenderSearch = (input_gender) => {
    setGender((gender = input_gender));
    let data = sortByGender(gender, fetchProducts());
    props.data(data, input_gender);
  };

  return (
    <>
      <div className="logo-header">
        <Link
          to="/"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Home"
          className="logo-name"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "10%",
            fontSize: "0.8rem",
            textDecoration: "none",
            color: "black",
          }}
        >
          <h1>
            Tunic<span style={{ color: "red" }}>.</span>
            <span style={{ fontSize: "15px", paddingTop: "10px" }}>com</span>
          </h1>
        </Link>

        <div className="header-menu">
          <ul className="header-menu-ul">
            <li
              data-toggle="tooltip"
              data-placement="bottom"
              title="Men's Shirts"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Men");
              }}
            >
              Men
            </li>
            <li
              data-toggle="tooltip"
              data-placement="bottom"
              title="Women's Shirts"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Women");
              }}
            >
              Women
            </li>
            <li
              data-toggle="tooltip"
              data-placement="bottom"
              title="Boys Shirts"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Boys");
              }}
            >
              Boys
            </li>
            <li
              data-toggle="tooltip"
              data-placement="bottom"
              title="Girls Shirts"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Girls");
              }}
            >
              Girls
            </li>
            <li>Beauty</li>
            <li
              onClick={() => {
                handleGenderSearch();
              }}
            >
              Studio
            </li>
          </ul>
        </div>

        <div
          className="search-bar"
          data-toggle="tooltip"
          data-placement="right"
          title="Search and press Enter"
        >
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{
              backgroundColor: "white",
              height: "70%",
              marginLeft: "14px",
              width: "90%",
              borderColor: "transparent",
            }}
            placeholder="Search..."
          ></input>
          {value != "" ? (
            <img
              style={{
                height: "20px",
                width: "20px",
              }}
              src={close}
              onClick={() => {
                setValue((value = ""));
              }}
            ></img>
          ) : (
            <img
              style={{
                height: "30px",
                width: "30px",
              }}
              src={searchIco}
            ></img>
          )}
        </div>

        <div
          className="wishlist-btn-d"
          data-toggle="tooltip"
          data-placement="bottom"
          title="My Wishlist"
        >
          <Link
            to="/wishlist"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png"></img>
          </Link>
        </div>

        <div
          className="cart-icon"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Cart"
          onClick={() => {
            handleShowCart();
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"></img>
          <div className="cart-count">{count}</div>
        </div>
        {showCart ? <Cart data={handleShowCart} /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

export default connect(mapStateToProps, {})(Navbar);
