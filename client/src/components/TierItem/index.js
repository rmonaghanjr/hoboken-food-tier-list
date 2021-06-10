import "./TierItem.css";
import React from "react";
import PropTypes from "prop-types";

const TierItem = (props) => {
    return (
        <div className="tier-row-item">
            <p className="tier-item-title">{props.name}</p>
            <button className="button" onClick={() => {
                window.open(props.website, "_blank");
            }}>Open Website</button>
        </div>
    );
}

TierItem.propTypes = {
    name: PropTypes.string,
    website: PropTypes.string
}

export default TierItem;