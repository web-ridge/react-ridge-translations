declare type CopyFunction<TFn, TR> = TFn extends (...a: infer A) => any ? (...a: A) => TR : string;
declare type Translations<TGroup> = {
    [group in keyof TGroup]: {
        [key in keyof TGroup[group]]: CopyFunction<TGroup[group][key], string>;
    };
};
declare type Options<TValue> = {
    language: keyof TValue;
    fallback: keyof TValue;
};
declare type TranslationsObject<TGroup, TValue> = {
    translations: Translations<TGroup>;
    use: () => Translations<TGroup>;
    useOptions: () => Options<TValue>;
    setOptions: (options: Options<TValue>) => any;
    getOptions: () => Options<TValue>;
};
declare type val<T> = (...params: any[]) => T;
declare type val1<T> = T;
declare type TranslationInput<TValue> = {
    [group: string]: {
        [key: string]: val<TValue> | val1<TValue>;
    };
};
declare type TranslationLanguagesInput = {
    [language: string]: string;
};
export declare function createTranslations<TValue extends TranslationLanguagesInput>(): <TGroup extends TranslationInput<TValue>>(t: TGroup, po: Options<TValue>) => TranslationsObject<TGroup, TValue>;
export {};
