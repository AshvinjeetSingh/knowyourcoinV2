import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useGetSuggestionQuery } from "../services/cryptoAPI";
import { useNavigate } from "react-router-dom";
function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      const rows = document.getElementById("ListCoins");
      if (rows != null && rows != undefined) {
        rows.style.display = "block";

        // alert("hello tehre")
      }
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        const rows = document.getElementById("ListCoins");
        rows.style.display = "none";
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

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
    isError,
    isSuccess,
  } = useGetSuggestionQuery(searchTerm);
  const [list, setList] = useState([]);

  const node = useRef(null);
  const elem = useRef();
  useOutsideAlerter(node);

  useEffect(() => {
    setList(suggestionList?.data?.coins);
    console.log("renderred list is", list);
  }, [suggestionList, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      const rows = document.getElementById("ListCoins");
      if (rows != null && rows != undefined) {
        rows.style.display = "block";
      }
      if (node.current && !node.current.contains(event.target)) {
        const rows = document.getElementById("ListCoins");
        rows.style.display = "none";
        setSearchTerm("");
      }
    }

    // Bind the event listener
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
    console.log("It is diff", matchCoins);
  }, [matchCoins]);

  useEffect(() => {
    const data =
      list &&
      list.length > 0 &&
      list.map((item) =>
        item.name.replace(/\s+/g, "-").replace(/\./g, "-").trim()
      );
    setCoins(data);
    const otherVal = list && list.length > 0 && list;
    setOtherData(list);
  }, [list]);
  useEffect(() => {
    console.log("coins are changed");
    let suggestion = [];
    suggestion = coins && coins.length > 0 && coins;
    console.log("suggestion", suggestion);
    setMatchCoins(suggestion);
  }, [coins]);

  const onTextChanged = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const suggestionSelectedValue = (value) => {
    setSearchTerm(value.name);
    setMatchCoins([]);
    history(`/coins/${value.uuid}`);
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
        {/* <span id="searchIcon">
          <Icon icon={searchAlt} style={{color: '#7666E4',fontSize: '30px'}} hFlip={true} />
        </span> */}
      </div>
    </>
  );
};

export default Autosuggest;
