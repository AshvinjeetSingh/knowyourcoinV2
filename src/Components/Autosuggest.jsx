import React, { useState, useEffect, useRef } from "react";
import { useGetSuggestionQuery } from "../services/cryptoAPI";
import { useNavigate } from "react-router-dom";

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      const rows = document.getElementById("ListCoins");
      if (rows !== null && rows !== undefined) {
        rows.style.display = "block";
      }
      if (ref.current && !ref.current.contains(event.target)) {
        const rows = document.getElementById("ListCoins");
        rows.style.display = "none";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);}


const Autosuggest = (props) => {
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState([]);
  const [matchCoins, setMatchCoins] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const {
    data: suggestionList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetSuggestionQuery(searchTerm);
  const [list, setList] = useState([]);

  const node = useRef(null);
  const elem = useRef();
  useOutsideAlerter(node);

  useEffect(() => {
    setList(suggestionList?.data?.coins);
  }, [suggestionList, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      const rows = document.getElementById("ListCoins");
      if (rows !== null && rows !== undefined) {
        rows.style.display = "block";
      }
      if (node.current && !node.current.contains(event.target)) {
        const rows = document.getElementById("ListCoins");
        rows.style.display = "none";
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node]);

  useEffect(() => {
    if (isLoading || isFetching) {
      return "Wait for it";
    } else {
      let suggestion = [];
      suggestion = coins && coins.length > 0 && coins;
      setMatchCoins(suggestion);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    const data =
      list &&
      list.length > 0 &&
      list.map((item) =>
        item.name.replace(/\s+/g, "-").replace(/\./g, "-").trim()
      );
    setCoins(data);
    setOtherData(list);
  }, [list]);
  useEffect(() => {
    let suggestion = [];
    suggestion = coins && coins.length > 0 && coins;
    setMatchCoins(suggestion);
  }, [coins]);

  const onTextChanged = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const suggestionSelectedValue = (value) => {
    setSearchTerm(value.name);
    setMatchCoins([]);
    history(`/crypto/${value.uuid}`);
  };

  const renderSuggestions = () => {
    return (
      <div className="ListCoins" id="ListCoins" ref={node}>
        {isSuccess &&
          !isLoading &&
          !isFetching &&
          otherData &&
          otherData.length &&
          otherData.map((item) => {
            return (
              <p
                ref={elem}
                id="pval"
                className="autoSuggestValues"
                onClick={() => suggestionSelectedValue(item)}
                style={{
                  maxWidth: "100%",
                  cursor: "pointer",
                  margin: "0px",
                }}
              >
                <span>
                  <img src={item.iconUrl} alt="coinLLogo" style={{maxWidth:"40px",padding:"10px"}}/>
                  {item.name}
                </span>
              </p>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div id="searchBar">
        <input
          value={searchTerm}
          type="text"
          placeholder="Search Your Coin"
          onChange={onTextChanged}
          className="searchCoinInput"
        />
        {searchTerm.length > 0 && renderSuggestions()}
      </div>
    </>
  );
};

export default Autosuggest;
