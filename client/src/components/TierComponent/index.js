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
                    return <TierItem key={place._id} name={place.name} website={place.website} id={place._id} onVote={props.onVote} s={place.s} a={place.a} b={place.b} c={place.c} d={place.d} f={place.f} voteCount={place.voteCount}/>
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