import React from "react";
import FontAwesome from "react-fontawesome";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map(val => {
        const starType =
          rating >= val
            ? "star"
            : val - rating <= 0.5 ? "star-half-o" : "star-o";
        return (
          <FontAwesome
            key={val}
            name={starType}
            style={{
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
            }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
