import React from "react";

/** CSS **/
import "./Episode.scss";

/** Third Party Libraries **/
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { Icon } from "react-icons-kit";
import { play } from "react-icons-kit/fa/play";

/** Assets **/
import img from "../assets/defaultImg.jpeg";

const Episode = (props: any): JSX.Element => {
  const {
    genres,
    image,
    name,
    officialSite,
    url,
    language,
    rating
  } = props.movie.show;
  return (
    <div className="card">
      <div className="poster">
        <img src={image ? image.original : img} alt="series poster" />
      </div>
      <div className="details">
        <h2>
          {name} <br />
          <span>{language}</span>
        </h2>
        <div className="rating">
          <Rater
            total={10}
            rating={Math.floor(rating.average)}
            interactive={false}
          />

          <span>{Math.floor(rating.average)} / 10</span>
        </div>
        <div className="tags">
          {genres.map((genre: string, i: number) => {
            return (
              <span className="single-tag" key={i}>
                {genre}
              </span>
            );
          })}
        </div>
        <div className="footer">
          <span>
            <a
              href={officialSite ? officialSite : url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon={play} />
              Watch now
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Episode;
