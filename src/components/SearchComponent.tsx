import React, { useState } from "react";

/** Third Party libraries **/
import { inject } from "mobx-react";

/** CSS **/
import "./SearchComponent.scss";

/** ICONS **/
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/fa/search";

export const SearchComponent = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target as HTMLInputElement;
    const { value } = target;
    setSearchTerm(value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.movieStore.getMovies(searchTerm);
    setSearchTerm("");
  };

  return (
    <form onSubmit={onSubmit} data-testid="search-form">
      <div className="search-box">
        <input
          type="text"
          name="searchTerm"
          className="search-txt"
          placeholder="Type to Search"
          value={searchTerm}
          onChange={handleChange}
          data-testid="searchTerm"
        />
        <div className="search-button" onClick={onSubmit} data-testid="submit">
          <Icon icon={search} />
        </div>
      </div>
    </form>
  );
};
export default inject("movieStore")(SearchComponent);
