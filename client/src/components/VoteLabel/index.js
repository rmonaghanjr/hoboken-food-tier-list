import "./VoteLabel.css"
import React from "react";
import PropTypes from "prop-types";

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

const VoteLabel = (props) => {
    return (
        <div style={{margin: 10}}>
            <div style={{display: "inline-block", backgroundColor: props.color, width: `${props.percent.clamp(6, 97)}%`, height: 20, marginLeft: 10, borderRadius: 5, padding: 5}}>{props.tier} ({Math.floor(props.percent)}%)</div>
        </div>
    );
}

VoteLabel.propTypes = {
    tier: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}

export default VoteLabel;