import React from "react";
import { RichUtils } from "draft-js";
import { Container, ToolbarItem } from "./common";
import { inlineStyles } from "./constants";

export const RenderInlineStyle = ({ editorState, updateEditorState }) => {
  function applyStyle(e, style) {
    e.preventDefault();
    updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function isActive(style) {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }

  return (
    <Container>
      {inlineStyles.map((item, idx) => {
        return (
          <ToolbarItem
            key={idx}
            isActive={isActive(item.style)}
            onClick={(e) => applyStyle(e, item.style)}
          >
            {item.icon}
          </ToolbarItem>
        );
      })}
    </Container>
  );
};
