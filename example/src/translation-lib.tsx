import * as R from "react";

type CopyFunction<TFn, TR> = TFn extends (...a: infer A) => any
  ? (...a: A) => TR
  : string;
type ValueOf<T> = T[keyof T];

type Translations<TGroup> = {
  [group in keyof TGroup]: {
    [key in keyof ValueOf<TGroup>]: CopyFunction<ValueOf<TGroup>[key], string>;
  };
};

type Options<TValue> = {
  language: keyof TValue;
  fallback: keyof TValue;
};

type TranslationsObject<TGroup, TValue> = {
  translations: () => Translations<TGroup>;
  use: () => Translations<TGroup>;
  setOptions: (options: Options<TValue>) => any;
  useOptions: () => Options<TValue>;
  getOptions: () => Options<TValue>;
  context: R.Context<Options<TValue> | undefined>;
};

type SubscriberFunc = (n: number) => any;
type val<T> = (...params: any[]) => T;
type val1<T> = T;

type TranslationInput<TValue> = {
  [group: string]: {
    [key: string]: val<TValue> | val1<TValue>;
  };
};

type TranslationGeneratedMap<TValue, TGroup> = {
  [language: string]: Translations<TGroup>;
};

// type TranslationsPerLanguage<TGroup> = {
//   [language: string]: {
//     [group in keyof TGroup]: {
//       [key in keyof ValueOf<TGroup>]: CopyFunction<
//         ValueOf<TGroup>[key],
//         string
//       >;
//     };
//   };
// };

type TranslationLanguagesInput = {
  [language: string]: string;
};

// loop keys func to make library smaller
let lk = (k: object, c: (key: string) => any) => Object.keys(k).forEach(c);

export function createTranslations<TValue extends TranslationLanguagesInput>() {
  return function <TGroup extends TranslationInput<TValue>>(
    t: TGroup,
    po: Options<TValue>,
    ls: (keyof TValue)[]
  ): TranslationsObject<TGroup, TValue> {
    // subscribers with callbacks for external updates
    let sb: SubscriberFunc[] = [];

    let o = po;
    // empty map for easier translations
    let et: TranslationGeneratedMap<TValue, TGroup> = {};
    //@ts-ignore
    ls.forEach((l) => (et[l] = {}));

    // make it possible to override options with context
    let context = R.createContext<Options<TValue> | undefined>(undefined);

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

    // loop translations groups
    ls.forEach((l) => {
      lk(t, (g) => {
        // loop keys
        lk(t[g], (k) => {
          // e.g. 'Sign in'
          let tv = t[g][k];

          // @ts-ignore
          et[l][g] = et[l][g] || {};

          // @ts-ignore
          et[l][g][k] =
            tv instanceof Function
              ? (...p: any) => {
                  let z = (tv as Function)(...p);
                  return z[l];
                }
              : tv[l];
        });
      });
    });

    function setOptions(op: Options<TValue>) {
      o = op;

      // call subscribers
      sb.forEach((c: any) => c((p: number) => p + 1));
    }

    function sub(): Options<TValue> | undefined {
      let [, s] = R.useState<number>(0);
      let oo = R.useContext(context);
      // subscribe to changes
      R.useEffect(() => {
        sb.push(s);
        return () => {
          sb = sb.filter((f) => f !== s);
        };
      }, [s]);
      return oo || o;
    }
    // use hook
    function use(): any {
      let oo = sub();
      // return easier translations object
      // @ts-ignore
      return et[oo?.language || o.language] || et[oo?.fallback || o.fallback];
    }

    return {
      // @ts-ignore
      translations: () => et[o.language],
      getOptions: () => o,
      setOptions,
      // @ts-ignore
      useOptions: sub,
      use,
      context,
    };
  };
}
