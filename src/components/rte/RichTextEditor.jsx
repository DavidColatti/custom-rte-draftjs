import React, { useState, useRef } from "react";
import { EditorState, Editor as DraftEditor, RichUtils } from "draft-js";
import styled from "styled-components";

import Toolbar from "../toolbar/Toolbar";

const EditorWrapper = styled.div`
  min-width: 700px;
  display: flex;
  height: fit-content;
  flex-direction: column;
  margin-top: 3em;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 9em;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef();

  function focusEditor() {
    editor.current.focus();
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  return (
    <EditorWrapper>
      <Toolbar editorState={editorState} updateEditorState={setEditorState} />

      <EditorContainer onClick={focusEditor}>
        <DraftEditor
          ref={editor}
          spellCheck={true}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Type here for placeholder..."
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default RichTextEditor;
