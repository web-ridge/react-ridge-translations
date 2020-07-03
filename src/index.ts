import * as R from "react";

type CopyFunction<TFn, TR> = TFn extends (...a: infer A) => any ? (...a:A) => TR: string
type ValueOf<T> = T[keyof T];

type Translations<TGroup> = {
  [group in keyof TGroup]: {
    [key in keyof ValueOf<TGroup>]: CopyFunction<ValueOf<TGroup>[key], string>
  }
}

type Options<TValue> = {
  language: keyof TValue,
  fallback: keyof TValue,
}

type TranslationsObject<TGroup, TValue> = {
  translations: Translations<TGroup>,
  use: () => Translations<TGroup>;
  setOptions: (options: Options<TValue>) => any;
  getOptions: () => Options<TValue>,
}


type SubscriberFunc = (n:number) => any;
type val<T> = (...params: any[]) => T
type val1<T> = T

type TranslationInput<TValue> = {
  [group: string]: {
    [key: string]:  val<TValue> | val1<TValue>
  },
}

type TranslationLanguagesInput = {
  [language: string]: string,
}

export function createTranslations<TValue extends TranslationLanguagesInput>(){
  return function <TGroup extends TranslationInput<TValue>>(t: TGroup, po: Options<TValue>): TranslationsObject<TGroup, TValue> {
    // subscribers with callbacks for external updates
    let sb: SubscriberFunc[] = [];

    let o = po
    // empty map for easier translations
    let et: any = {}

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
        // @ts-ignore
        Object.keys(t[g]).forEach(k => {
          // e.g. 'Sign in'
          // @ts-ignore
          let tv = t[g][k]

          // map them in easier translation map
          et[g][k] = tv instanceof Function ? (...p: any) => {
            let z = (tv as Function)(...p)
            return z[o.language] || z[o.fallback]
          } : tv[o.language] || tv[o.fallback]
        })
      })
    }

    function setOptions(op: Options<TValue>) {
      o = op
      gen()

      // call subscribers
      sb.forEach((c: any) => c((p: number) => p + 1));
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

    gen()
    return {
      translations: et,
      getOptions: () => o,
      setOptions,
      use,
    };
  }
}
