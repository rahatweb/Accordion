import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Accordion.css";
import data from "./data";
const accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelectionItems, setMultiSelectionItems] = useState([]);
  const handleClick = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };
  const multipleSelectionhandleClick = (getCurrentId) => {
    let items = [...multiSelectionItems];
    const findCurrentId = items.indexOf(getCurrentId);
    if (findCurrentId === -1) {
      items.push(getCurrentId);
    } else {
      items.splice(findCurrentId, 1);
    }
    setMultiSelectionItems(items);
  };
  console.log(selected, multiSelectionItems);
  return (
    <div className="wrapper">
      <div onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection ? (
          <button>Disable Multi Selection</button>
        ) : (
          <button>Enable Multi Selection</button>
        )}
      </div>
      <div className="accordion">
        {data && data.length ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => multipleSelectionhandleClick(dataItem.id)
                    : () => handleClick(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <div>
                  {selected === dataItem.id ? (
                    <span>
                      <IoIosArrowUp />
                    </span>
                  ) : (
                    <span>
                      <IoIosArrowDown />
                    </span>
                  )}
                </div>
              </div>
              <div className="answer-content">
                {enableMultiSelection
                  ? multiSelectionItems.indexOf(dataItem.id) !== -1 && (
                      <div className="answer">
                        <h4>{dataItem.answer}</h4>
                      </div>
                    )
                  : selected === dataItem.id && (
                      <div className="answer">
                        <h4>{dataItem.answer}</h4>
                      </div>
                    )}
                {/* {selected === dataItem.id ? (
                  <div className="answer">
                    <h4>{dataItem.answer}</h4>
                  </div>
                ) : null} */}
              </div>
            </div>
          ))
        ) : (
          <h1>Data Not Found</h1>
        )}
      </div>
    </div>
  );
};
export default accordion;
