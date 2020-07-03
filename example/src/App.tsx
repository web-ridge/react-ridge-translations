import React from 'react';
import translate from "./translate";

function App() {
  const appScreen= translate.use().appScreen

   const t =  translate.use()


  return (
    <div className="App">
      <header className="App-header">

          {appScreen.welcomeText({firstName: 'test'})}
          <br />
          {appScreen.yesText}
      </header>
        <h2>{appScreen.changeLanguageText}</h2>
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
