import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(true);
  };

  const closeSearchResults = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        isSearching,
        handleSearchResults,
        closeSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
