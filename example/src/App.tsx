import React from 'react';
import translate from "./translate";

function App() {
  const {yesText,welcomeText,changeLanguageText} = translate.use().appScreen

   const t =  translate.use()
console.log(t.)

  return (
    <div className="App">
      <header className="App-header">
          {/*
          // @ts-ignore */}
          {welcomeText({firstName: 'Richard'})}
          <br />
          {yesText}
      </header>
        <h2>{changeLanguageText}</h2>
        <button onClick={()=>translate.setOptions({
            language: 'fr',
            fallback: 'en',
        })}>Frans</button>
        <button onClick={()=>translate.setOptions({
            language: 'en',
            fallback: 'en',
        })}>Engels</button>
        <button onClick={()=>translate.setOptions({
            language: 'nl',
            fallback: 'en',
        })}>Nederlands</button>
    </div>
  );
}

export default App;
