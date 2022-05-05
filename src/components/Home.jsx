import React, { useState } from "react";
import "./Home.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { localStrings } from "../shared/shared.constants";

const Home = () => {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnButtonClick = () => {
    text.trim().length == 0 ? setAlert(true) : setAlert(false);

    speak({ text: text });
  };

  const handleOnCancelClick = () => {
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
        <button className="speech" onClick={handleOnButtonClick}>
          {localStrings.speech}
        </button>
        <button className="cancel" onClick={handleOnCancelClick}>
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
