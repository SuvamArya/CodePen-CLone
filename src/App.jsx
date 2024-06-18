import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {  faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [html, setHtml] = useLocalStorage('html', "");
  const [css, setCss] = useLocalStorage('css', "");
  const [js, setJs] = useLocalStorage('js', "");
  const [srcDoc, setSrcDoc] = useState("");
  const [top, setTop] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
        `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className={` top-pane ${top? "" : 'top-collapse'}`}>
        <div className="sidebar">

        <img className="logo" src="/codepen.svg" alt="Codepen Logo" />

        <a href="https://github.com/SuvamArya/CodePen-CLone" target="_blank">
          <img className="github"
          src="/github.svg" alt="My Github page" />
        </a>

        </div>

        <Editor
          id="html"
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />

        <Editor
          id="css"
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />

        <Editor
          id="js"
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
         <button
          type="button"
          className="top-expand-collapse"
          onClick={()=>{setTop(prev => !prev)}}
          >
            <FontAwesomeIcon icon = {top?  faCompress : faExpand}/>
          </button>
      </div>
      <div className={`pane ${top? "" : 'pane-expand'}`}>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />

        
        
      </div>
    </>
  );
};

export default App;
