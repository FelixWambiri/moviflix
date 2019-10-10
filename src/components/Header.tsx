import React from "react";

/** Components **/
import SearchComponent from "./SearchComponent";

const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <SearchComponent />
    </header>
  );
};
export default Header;
