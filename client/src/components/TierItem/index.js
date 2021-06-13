import "./TierItem.css";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import VoteLabel from "../VoteLabel";
import { useToasts } from "react-toast-notifications";

const TierItem = (props) => {

    const {addToast} = useToasts();

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [vote, setVote] = useState("s");

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const submitVote = () => {
        let url = "http://stevensfoodguide.com:8000/api/ratings/"+props.id+"/vote/"+vote;

        fetch(url)
        .then(res => {
            if (res.status === 200) {
                closeModal();
                addToast("Vote recorded!", {appearance: "success"});
                let url2 = "http://stevensfoodguide.com:8000/api/stats/increment/rateCount";
		        fetch(url2)
                .then(res => {console.log(res)})
            } else {
                closeModal();
                addToast("Internal server error occurred. Please try again later.", {appearance: "error"});
            }

            props.onVote();

        })
    };

    return (
        <div className="tier-row-item">
            <p className="tier-item-title">{props.name}</p>
            <button className="button w-100" onClick={() => {
                window.open(props.website, "_blank");
            }}>Open Website</button>
            <br/>
            <button className="button w-100" onClick={() => {
                openModal()
            }}>Vote</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        backgroundColor: "rgb(26, 26, 23)"
                    },
                    overlay: {
                        backgroundColor: "rgba(26, 26, 23, 0.5)"
                    }
                }}
            >
                <h2 className="title">{props.name}</h2>
                <p className="white">Restaurant: <strong>{props.name}</strong></p>
                <p className="white">Website: <strong><a onClick={() => {
                    window.open(props.website, "_blank");
                }}>{props.website}</a></strong></p>
                <br/><br/>
                <h4 className="white">Vote Breakdown</h4>
                <div>
                <select value={vote} onChange={(e) => {
                    setVote(e.target.value);
                }}>
                    <option value="s">S Tier</option>
                    <option value="a">A Tier</option>
                    <option value="b">B Tier</option>
                    <option value="c">C Tier</option>
                    <option value="d">D Tier</option>
                    <option value="f">F Tier</option>
                </select>
                <button onClick={submitVote} className="button">Vote</button>
                </div>
                <br/><br/>
                <h4 className="white">Vote Breakdown</h4>

                <VoteLabel color={"#FE7E7E"} tier={"S Tier"} percent={props.s === undefined ? 0 : props.s / props.voteCount} />
                <VoteLabel color={"#FFBE7E"} tier={"A Tier"} percent={props.a === undefined ? 0 : props.a / props.voteCount} />
                <VoteLabel color={"#FFFF7F"} tier={"B Tier"} percent={props.b === undefined ? 0 : props.b / props.voteCount} />
                <VoteLabel color={"#BEFE7E"} tier={"C Tier"} percent={props.c === undefined ? 0 : props.c / props.voteCount} />
                <VoteLabel color={"#7FFFFF"} tier={"D Tier"} percent={props.d === undefined ? 0 : props.d / props.voteCount} />
                <VoteLabel color={"#7EBEFE"} tier={"F Tier"} percent={props.f === undefined ? 0 : props.f / props.voteCount} />

                <br/><br/>
                <button onClick={closeModal} className="button">Close</button>
            </Modal>
        </div>
    );
}

TierItem.propTypes = {
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
}

export default TierItem;