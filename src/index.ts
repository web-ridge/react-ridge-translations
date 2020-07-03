import * as R from "react";


type val<T> = (...params: any[]) => T
type val1<T> = T

type Translations<T> = {
  [group: string]: {
    [key: string]:  val<T> | val1<T>
  },
}

type EasierTranslations<T>  = {
  [group: string]: {
    [key: string]:  val<string> | val1<string>
  },
}

type Options<T> = {
  language: keyof T,
  fallback: keyof T,
}



type TranslationsObject<T> = {
  translations: EasierTranslations<T>,
  use: () => EasierTranslations<T>;
  setOptions: (options: Options<T>) => any;
  getOptions: () => Options<T>,
}


type SubscriberFunc = (n:number) => any;

export function createTranslations<T>(t: Translations<T>, po: Options<T>): TranslationsObject<T> {
  // subscribers with callbacks for external updates
  let sb: SubscriberFunc[] = [];

  let o = po
  // empty map for easier translations
  let et = {}

  // convert
  // {
  //   homeScreen:{
  //     loginButton:{
  //       nl: 'Inloggen,
  //       en: 'Sign in',
  //     }
  //   }
  // }
  //
  // to =>> based on the current language
  //
  //   homeScreen:{
  //     loginButton:'Sign in',
  //   }
  // }

  function gen() {
    // loop translations groups
    Object.keys(t).forEach(g => {
      // easierTranslation map with the group in the key
      et[g] = {}

      // loop translations inside group
      Object.keys(t[g]).forEach(k => {
        // e.g. 'Sign in'
        let tv = t[g][k]

        // map them in easier translation map
          et[g][k] = tv instanceof Function ? (...p) => {
            let z = (tv as Function)(...p)
            return z[o.language] || z[o.fallback]
          } : tv[o.language] || tv[o.fallback]
      })
    })
  }

  function setOptions(op: Options<T>) {
      o = op
      gen()

      // call subscribers
      sb.forEach((c: any) => c(p => p + 1));
  }

  // use hook
  function use(): any {
    let [, s] = R.useState<number>(0);

    // subscribe to changes
    R.useEffect(() => {
      sb.push(s);
      return () => {
        sb = sb.filter((f) => f !== s);
      };
    }, [s]);

    // return easier translations object
    return et;
  }

  // generate translations for current language
  gen()

  return {
    translations: et,
    getOptions: () => o,
    setOptions,
    use,
  };
}
