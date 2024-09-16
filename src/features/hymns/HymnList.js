import React, { useState } from "react";
import ListItem from "../../components/ListItem";
import { useGetHymnsQuery } from "./hymnsSlice";

const HymnList = () => {

  const {
    data: hymns,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHymnsQuery();

  let content;
  const staff = [
    { name: "Billy", role: "admin" },
    { name: "Sally", role: "contributor" },
  ];
  if (isLoading) {
    console.log("Is Loading");
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = hymns.map((hymn) => (
      <ListItem key={hymn.hymn_number} hymn = {hymn}/>
    ));
    content = <ul>{content}</ul>
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1 className="title">Hyms Index</h1>
      {content}
    </main>
  );
};

export default HymnList;
