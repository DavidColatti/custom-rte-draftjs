import React from "react";
import { RichUtils } from "draft-js";
import { Container, ToolbarItem } from "./common";
import { blockTypes } from "./constants";

export const RenderBlockStyle = ({ editorState, updateEditorState }) => {
  function applyBlockStyle(e, style) {
    e.preventDefault();
    updateEditorState(RichUtils.toggleBlockType(editorState, style));
  }

  function isActive(style) {
    const selection = editorState.getSelection();

    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return blockType === style;
  }

  return (
    <Container>
      {blockTypes.map((item, idx) => {
        return (
          <ToolbarItem
            key={idx}
            isActive={isActive(item.style)}
            onClick={(e) => applyBlockStyle(e, item.style)}
          >
            {item.icon}
          </ToolbarItem>
        );
      })}
    </Container>
  );
};
