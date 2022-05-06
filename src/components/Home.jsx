import React, { useState } from "react";
import "./Home.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { localStrings } from "../shared/shared.constants";

const Home = () => {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnSpeakBtnClick = () => {
    text.trim().length === 0 ? setAlert(true) : setAlert(false);

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
        ></textarea>
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
        <button className="speech" onClick={handleOnSpeakBtnClick}>
          {localStrings.speech}
        </button>
        <button className="cancel" onClick={handleOnCancelBtnClick}>
          {localStrings.cancel}
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
