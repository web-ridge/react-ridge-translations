import * as React from "react";
import translate from "./translate";

function App() {
  const [firstName, setFirstName] = React.useState<string>("");
  const translations = translate.use().appScreen;

  return (
    <>
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
    </>
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
