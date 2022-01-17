import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, AutoComplete, Select } from "antd";
import {
  useGetSuggestionQuery,
  useGetCryptoOffsetQuery,
} from "../services/cryptoAPI";
import Loader from "./Loader";
import { Pagination } from "antd";
import Autosuggest from "./Autosuggest";

const Cryptocurrencies = ({ simplified }) => {
  const [offset, setOffset] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const { data: cryptosList, isFetching } = useGetCryptoOffsetQuery(offset);
  const { data: suggestionList, isLoading } = useGetSuggestionQuery(searchTerm);
  const [cryptos, setCryptos] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    window.scrollTo(0, 0);
  }, [cryptosList, searchTerm]);

  useEffect(() => {
    console.log("hello");
    setList(suggestionList?.data?.coins);
  }, [suggestionList, searchTerm]);

  useEffect(() => {
    console.log("lt si ", list);
  }, [list]);

  const paginate = (defaultPageSize, page) => {
    setOffset(defaultPageSize * 50 - 50);
    console.log(defaultPageSize);
    setCurrent(defaultPageSize);
  };

  const searchSuggestion = (e) => {
    let matches = [];
    if (searchTerm.length > 0) {
      matches = list.filter((user) => {
        const regex = new RegExp(`${searchTerm}`, "gi");
        return user.name.match(regex);
      });
    }
    setList(matches);
    console.log("matches", matches);
    setSearchTerm(e.target.value.toLowerCase());
  };

  const suggestionSelected = (text) => {
    setSearchTerm(text);
    setList([]);
  };

  if (isFetching) return <Loader />;
  if (isLoading) return "Wait...";

  return (
    <>
    {!simplified &&<div className="search-crypto">
      <Autosuggest/>
      </div>}
      
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    key={currency.id}
                  />
                }
                hoverable
              >
                <p>Price: {currency.price ? millify(currency.price) : "NA"}</p>
                <p>
                  Market Cap:{" "}
                  {currency.marketCap ? millify(currency.marketCap) : "NA"}
                </p>
                <p>
                  Daily Change:
                  <span className={currency.change < 0 ? "red" : "green"}>
                    {currency.change ? `${currency.change}%` : "NA"}
                  </span>{" "}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {!simplified &&<Pagination
        current={current}
        defaultPageSize={50}
        total={13087}
        onChange={(defaultPageSize, page) => paginate(defaultPageSize, page)}
      />}
    </>
  );
};

export default Cryptocurrencies;
