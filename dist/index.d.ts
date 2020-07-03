declare type val<T> = (...params: any[]) => T;
declare type val1<T> = T;
declare type Translations<T> = {
    [group: string]: {
        [key: string]: val<T> | val1<T>;
    };
};
declare type EasierTranslations<T> = {
    [group: string]: {
        [key: string]: val<string> | val1<string>;
    };
};
declare type Options<T> = {
    language: keyof T;
    fallback: keyof T;
};
declare type TranslationsObject<T> = {
    translations: EasierTranslations<T>;
    use: () => EasierTranslations<T>;
    setOptions: (options: Options<T>) => any;
    getOptions: () => Options<T>;
};
export declare function createTranslations<T>(t: Translations<T>, po: Options<T>): TranslationsObject<T>;
export {};
