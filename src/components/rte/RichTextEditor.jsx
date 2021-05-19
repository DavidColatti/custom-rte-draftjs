import React, { useState, useRef } from "react";
import {
  EditorState,
  Editor as DraftEditor,
  RichUtils,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { convertToHTML, convertFromHTML } from "draft-convert";

import { EditorWrapper, EditorContainer } from "../styledComponents";

import Toolbar from "../toolbar/Toolbar";

const RichTextEditor = ({ htmlValue = "" }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromHTML(htmlValue))
  );
  const [convertedContent, setConvertedContent] = useState();

  const editor = useRef();

  function focusEditor() {
    editor.current.focus();
  }

  function onChange(editorState) {
    setEditorState(editorState);
    exportHTML();
  }

  function exportHTML() {
    setConvertedContent(convertToHTML(editorState.getCurrentContent()));
  }

  function onTab(e) {
    e.preventDefault();
    let currentState = editorState;

    const selection = currentState.getSelection();
    const blockType = currentState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    if (
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item"
    ) {
      onChange(RichUtils.onTab(e, currentState, 3));
    } else {
      let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        "    "
      );

      onChange(
        EditorState.push(currentState, newContentState, "insert-characters")
      );
    }
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  return (
    <>
      <EditorWrapper>
        <Toolbar editorState={editorState} updateEditorState={setEditorState} />

        <EditorContainer onClick={focusEditor}>
          <DraftEditor
            ref={editor}
            onTab={onTab}
            spellCheck={true}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
          />
        </EditorContainer>
      </EditorWrapper>

      <textarea value={convertedContent} />
    </>
  );
};

export default RichTextEditor;
