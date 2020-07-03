# react-ridge-translations :fr: :us: :uk: :es: :de: :gb: :cn: :ru: :it:

![Bundle Size](https://badgen.net/bundlephobia/minzip/react-ridge-translations) [![npm version](https://badge.fury.io/js/react-ridge-translations.svg)](https://badge.fury.io/js/react-ridge-translations) ![npm](https://img.shields.io/npm/dt/react-ridge-translations.svg)

**Simple** :muscle: **fast** ⚡️ and **small** :balloon: (400 bytes) translation library for React / React Native

```
yarn add react-ridge-translations
```

or

```
npm install react-ridge-translations --save
```

## Why another translation library :thinking:
We were frustrated with the API of other libraries and wanted a more type safe alternative for template tags

## Features :woman_juggling:

- React / React Native
- Simple
- Fast
- Very tiny (400 bytes)
- 100% Typesafe
- Hooks
- Use outside React components


## Getting started :clap: :ok_hand:

```tsx
// translate.ts

// first describe which languages are allowed/required (Typescript)
type TranslationLanguages = {
  nl: string
  fr: string
  be: string
}

// create a translation object with your translations
import { createTranslations } from 'react-ridge-translations'
export default const translate = createTranslations<TranslationLanguages>({
  homeScreen:{
    signIn: {
      nl: 'yes',
      fr: 'yes',
      be: 'yes',
    },
    welcomeText: ({ firstName }: { firstName: string }) => ({
      nl: `Hoi ${firstName}`,
      fr: `Hello ${firstName}`,
      be: `Hello ${firstName}`,
    }),
  }
}, {
    language: 'nl',
    fallback: 'en',
})
```

### Usage in React / React Native components
```tsx
import translate from './translate'
export default function HomeScreen() {   
    // use is a hook which will update automatically if language change :)
    const ht = translate.use().homeScreen
    return (
        <div>
            {ht.welcomeText({ firstName: 'Richard' })}
            {ht.signIn}
        </div>
    )
}
```


## Usage outside components
```tsx
import translate from './translate'
translate.translations.homeScreen.loginButton
```


## Changing language
```tsx
import translate from './translate'
translate.setOptions({
    language: 'nl',
    fallback: 'en',
})
```


## React Native
```tsx
import { NativeModules, Platform } from 'react-native';

const deviceLanguage =
          (Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier) || '';

const availableLanguages = ['nl', 'en', 'fr']
const fallback = 'en'

function getBestLanguage(): string {
    return availableLanguages.find(al => deviceLanguage.startsWith(al)) || fallback
}

export default const translate = createTranslations<TranslationLanguages>({
    // ........translations
}, {
    language: getBestLanguage(), 
    fallback,
})

```

## Get language React
```tsx
const deviceLanguage = navigator.userLanguage || navigator.language; 
const availableLanguages = ['nl', 'en', 'fr']
const fallback = 'en'
function getBestLanguage(): string {
    return availableLanguages.find(al => deviceLanguage.startsWith(al)) || fallback
}
export default const translate = createTranslations<TranslationLanguages>({
    // ........translations
}, {
    language: getBestLanguage(), 
    fallback,
})
```
