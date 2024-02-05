import React, { useState } from "react";
import "./Home.css";
import { CiPlay1, CiPause1, CiStop1 } from "react-icons/ci";
import useSpeechSynthesis from "../utils/useSpeechSynthesis";
import { localStrings } from "../shared/shared.constants";

const Home = () => {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const { speak, cancel, speaking, paused, pause, resume } =
    useSpeechSynthesis();

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnSpeakBtnClick = () => {
    text.trim().length === 0 ? setAlert(true) : setAlert(false);

    if (paused) resume();
    console.log("paused", paused);

    if (!speaking) speak({ text: text });
  };

  const handleOnCancelBtnClick = () => {
    cancel();
  };

  const renderHeader = () => {
    return <h2>{localStrings.header}</h2>;
  };

  const renderForm = () => {
    return (
      <div className="form">
        <textarea
          className="input"
          placeholder=" "
          required
          onChange={handleOnChange}
        />
        <label className="label" htmlFor="textarea">
          {localStrings.placeholder}
        </label>
      </div>
    );
  };

  const renderAlert = () => {
    return <p>{localStrings.alert}</p>;
  };

  const renderButtons = () => {
    return (
      <div className="buttons">
        {!speaking || paused ? (
          <button
            className="button"
            onClick={() => {
              handleOnSpeakBtnClick();
            }}
          >
            <CiPlay1 fontSize={"25"} />
          </button>
        ) : (
          <button
            className="button"
            onClick={() => {
              pause();
            }}
          >
            <CiPause1 fontSize={"25"} />
          </button>
        )}

        <button
          className="button"
          onClick={() => {
            handleOnCancelBtnClick();
          }}
        >
          <CiStop1 fontSize={"25"} />
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      {renderHeader()}
      {renderForm()}
      {alert && renderAlert()}
      {renderButtons()}
    </div>
  );
};

export default Home;
