import React from "react";
import styled from "styled-components";
import { RenderInlineStyle } from "./inlineStyle";

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 5px 7px;
  margin-bottom: 8px;
  border-radius: 2px 2px 0 0;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

const Toolbar = ({ editorState, updateEditorState }) => {
  return (
    <ToolbarContainer>
      <RenderInlineStyle
        editorState={editorState}
        updateEditorState={updateEditorState}
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
