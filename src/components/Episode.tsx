import React from "react";

/** CSS **/
import "./Episode.scss";

/** Assets **/
import img from "../assets/defaultImg.jpeg";

const Episode = (props: any): JSX.Element => {
  const { genres, image, name, officialSite, url, language } = props.movie.show;
  return (
    <div className="container">
      <div className="imgBx">
        <img src={image ? image.medium : img} alt="series poster" />
      </div>
      <div className="details">
        <div className="content">
          <h2>
            {name}
            <br />
            <span className="genres">{genres}</span>
          </h2>
          <h3>{language}</h3>
          <button>
            <a
              href={officialSite ? officialSite : url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Now
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Episode;
