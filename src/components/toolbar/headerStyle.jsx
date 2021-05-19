import React, { useState } from "react";
import { RichUtils } from "draft-js";
import { headerTypes } from "./constants";

export const RenderHeaderStyle = ({ editorState, updateEditorState }) => {
  const [headerValue, setHeaderValue] = useState("Normal");

  function onSelectChange(e) {
    setHeaderValue(e.target.value);
    updateEditorState(RichUtils.toggleBlockType(editorState, e.target.value));
  }

  return (
    <select id="header-select" value={headerValue} onChange={onSelectChange}>
      {headerTypes.map((item, idx) => {
        return (
          <option key={idx} value={item.style}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};
