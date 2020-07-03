import {createTranslations} from 'react-ridge-translations'

// first describe which languages are allowed/required (Typescript)
type TranslationLanguages = {
    nl: string
    fr: string
    en: string
}

const deviceLanguage = navigator.language;
const availableLanguages: (keyof TranslationLanguages)[] = ['nl', 'en', 'fr'] ;
const fallback = 'en'

function getBestLanguage(): typeof availableLanguages[number] | typeof fallback {
    return availableLanguages.find(al => deviceLanguage.startsWith(al)) || fallback
}

// create a translation object with your translations
const translate = createTranslations<TranslationLanguages>()({
    appScreen:{
        yesText: {
            nl: 'Ja',
            fr: 'Oui',
            en: 'Yes',
            yes: '',
            why: '???',
        },
        welcomeText: ({ firstName }: { firstName: string }) => ({
            nl: `Hallo ${firstName}`,
            fr: `Bonjour ${firstName}`,
            en: `Hello ${firstName}`,
        }),
        changeLanguageText: {
            nl: 'Verander taal',
            fr: 'Changer de langue',
            en: 'Change language',
        }
    }
}, {
    language: getBestLanguage(),
    fallback: 'en',
})
export default translate
