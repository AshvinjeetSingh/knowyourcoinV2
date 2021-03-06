import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout} from "antd";
import {
  Homepage,
  News,
  Cryptocurrencies,
  CryptoDetails,
  Navbar,
  Footer,
} from "./Components/index";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route
                  exact
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route
                  exact
                  path="/crypto/:coinId"
                  element={<CryptoDetails />}
                />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Fragment>
  );
};

export default App;
