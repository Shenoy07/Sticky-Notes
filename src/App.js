import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [values, setValues] = useState([]); //useState for Title and Note

  let title = " ";
  let note = " ";
  const keyValue = uuidv4();
  let d = new Date();
  d = d.toDateString();
  useEffect(() => {
    console.log(d);
    const data = localStorage.getItem("values");
    if (data) {
      setValues(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("values", JSON.stringify(values));
  });

  return (
    <div className="App">
      <div className="Entry">
        <div className="Title">Sticky Notes</div>
        <div id="yoyo" className="DefaultNote">
          <form>
            <input
              maxLength="20"
              required
              placeholder="Enter Title...(20characters)"
              onChange={(event) => (title = event.target.value)}
            />

            <textarea
              maxLength="250"
              cols="22"
              rows="8"
              required
              placeholder="Enter Description... limit(250characters)"
              onChange={(event) => (note = event.target.value)}
            />

            <div>
              <button
                className="SubmitButton"
                set
                type="reset"
                onClick={() => {
                  setValues([...values, { note, title, keyValue, d }]);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="Notes">
        <ul>
          {values.map(({ note, title, keyValue, d }) => {
            return (
              <li key={keyValue}>
                <div className="NoteContent">
                  <h3 className="NoteTitle">{title}</h3>
                  <p className="NoteDescription">{note}</p>
                </div>
                <div className="NoteFooter">
                  <span>{d}</span>
                  <div>
                    <i
                      className="fas fa-trash"
                      onClick={() => {
                        let newArr = values.filter(
                          (value) => value.keyValue !== keyValue
                        );
                        setValues([...newArr]);
                        console.log();
                      }}
                    ></i>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
