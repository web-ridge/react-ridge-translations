# react-ridge-translations
Translation library without the struggle

React-ridge-translations


Grouped translations
If you have a realy big app it would be nice to group translations

```tsx

const translationsState = createTranslations({
  language: 'nl',
  default: 'en', // fallback
  homeScreen:{
    loginButton:{
        nl: `Inloggen`,
        en: `Login`,
    },
    welcomeText: ({ firstName }: { firstName: string }) => {
        nl: `Hoi ${firstName}`,
        en: `Hello ${firstName}`,
    },
  }
})
```

// use them globally (e.g.) in your redux-saga 
```tsx
translationsState.homeScreen.loginButton (it automatically fixes the language for you here)
```
// use them in your component
```tsx

const translations = translationsState.use()
return (
  <div>
   <button>{translations.homeScreen.loginButton}</button>
  </div>
)

```
