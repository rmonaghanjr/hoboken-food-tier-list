import "./TierComponent.css"
import React from "react";
import PropTypes from "prop-types";
import TierItem from "../TierItem";

const TierComponent = (props) => {
    return (
        <div className="tier-row">
            <div className="tier" style={{
                backgroundColor: props.color
            }}>
                <p className="tier-text">{props.text}</p>
            </div>
            <div className="tier-items">
                {props.items !== undefined ? props.items.map((place) => {
                    return <TierItem name={place.name} website={place.website} id={place._id} onVote={props.onVote}/>
                }) : <p></p>}
            </div>
        </div>
    );
}

TierComponent.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    items: PropTypes.array
}

export default TierComponent;