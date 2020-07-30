import * as React from "react";
import translate from "./translate";

function testGlobalTranslations() {
  alert(translate.translations().appScreen.yes);
}

function App() {
  const [firstName, setFirstName] = React.useState<string>("");
  const translations = translate.use().appScreen;
  const options = translate.useOptions();
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 400,
      }}
    >
      Current language: {options.language}
      <h1>{translations.welcome({ firstName })}</h1>
      <input
        type="text"
        placeholder={translations.fillFirstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <h2>{translations.doYouLike}</h2>
      {translations.yes}
      <br />
      <h2>{translations.changeLanguage}</h2>
      <ChangeLanguageButton language={"fr"} label={"Français"} />
      <ChangeLanguageButton language={"en"} label={"English"} />
      <ChangeLanguageButton language={"nl"} label={"Nederlands"} />
      <br />
      <br />
      <translate.context.Provider
        value={{
          language: "nl",
          fallback: "en",
        }}
      >
        <ContextChild />
      </translate.context.Provider>
      <translate.context.Provider
        value={{
          language: "fr",
          fallback: "en",
        }}
      >
        <ContextChild />
      </translate.context.Provider>
      <button onClick={() => testGlobalTranslations()}>
        Test global translations
      </button>
    </div>
  );
}

function ContextChild() {
  const options = translate.useOptions();
  const translations = translate.use().appScreen;

  return (
    <div
      style={{
        border: "4px solid blue",
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      Override with {options.language}: {translations.changeLanguage}
    </div>
  );
}

function ChangeLanguageButton({
  language,
  label,
}: {
  language: "nl" | "fr" | "en";
  label: string;
}) {
  const onClick = () => {
    translate.setOptions({
      language,
      fallback: "en",
    });
  };
  return <button onClick={onClick}>{label}</button>;
}

export default App;
