import React from "react";

import RichTextEditor from "./components/rte/RichTextEditor";

const App = () => {
  const html = "<p>hi<br><strong>yooo</strong><h1>me</h1></p>";
  return <RichTextEditor htmlValue={html} />;
};

export default App;
