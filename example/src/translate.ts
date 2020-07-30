import { createTranslations } from "./translation-lib";

// first describe which languages are allowed/required (Typescript)
type TranslationLanguages = {
  nl: string;
  fr: string;
  en: string;
};

const deviceLanguage = navigator.language;
const availableLanguages: (keyof TranslationLanguages)[] = ["nl", "en", "fr"];
const fallback = "en";

function getBestLanguage():
  | typeof availableLanguages[number]
  | typeof fallback {
  return (
    availableLanguages.find((al) => deviceLanguage.startsWith(al)) || fallback
  );
}

// create a translation object with your translations
const translate = createTranslations<TranslationLanguages>()(
  {
    appScreen: {
      welcome: ({ firstName }: { firstName: string }) => ({
        nl: `Hallo ${firstName}`,
        fr: `Bonjour ${firstName}`,
        en: `Hello ${firstName}`,
      }),
      yes: {
        nl: "Ja",
        fr: "Oui",
        en: "Yes",
      },
      fillFirstName: {
        nl: "Voornaam invullen",
        fr: "Entrez votre prénom",
        en: "Enter first name",
      },
      doYouLike: {
        nl: "Vind je deze library goed?",
        fr: "Aimez-vous cette bibliothèque?",
        en: "Do you like this library?",
      },
      changeLanguage: {
        nl: "Verander taal",
        fr: "Changer de langue",
        en: "Change language",
      },
    },
  },
  {
    language: getBestLanguage(),
    fallback: "en",
  },
  availableLanguages
);
export default translate;
