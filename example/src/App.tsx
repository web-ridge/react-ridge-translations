import * as React from "react";
import translate from "./translate";

function testGlobalTranslations() {
  alert(translate.translations.appScreen.yes);
}

function App() {
  const [firstName, setFirstName] = React.useState<string>("");
  const translations = translate.use().appScreen;

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 400,
      }}
    >
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

      <button onClick={() => testGlobalTranslations()}>
        Test global translations
      </button>
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
