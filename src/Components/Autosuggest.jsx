import { AutoComplete } from "antd";
import React, { useState, useEffect } from "react";
import { useGetSuggestionQuery } from "../services/cryptoAPI";
import { Link } from "react-router-dom";

const { Option } = AutoComplete;

const Complete = () => {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: suggestionList, isLoading } = useGetSuggestionQuery(searchTerm);

  useEffect(() => {
    setResult(suggestionList?.data?.coins);
  }, [suggestionList, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
    setSearchTerm(value);
  };

  const onBlur = (value) => {
    console.log("onBlur", value);
    setSearchTerm("");
  };
  const children = result.map((coin) => {
    console.log(result)
    return <Option key={coin.name}>{coin.name}</Option>
    // <Link key={coin.name} to={`/crypto/${coin.name}`}>
    // </Link>
});
  if (isLoading) return "Wait";
  console.log("children", children);
  return (
    <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="Search your Coins"
      value={searchTerm}
      onSelect={onSelect}
      onBlur={onBlur}
    >
      {children?.length > 0 ? children : ""}
    </AutoComplete>
  );
};

export default Complete;
