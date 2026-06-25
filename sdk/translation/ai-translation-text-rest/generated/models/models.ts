// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Response for the languages API. */
export interface GetSupportedLanguagesResult {
  /** Languages that support translate API. */
  readonly translation?: Record<string, TranslationLanguage>;
  /** Languages that support transliteration API. */
  readonly transliteration?: Record<string, TransliterationLanguage>;
  /** LLM models supported. */
  readonly models?: string[];
}

export function getSupportedLanguagesResultDeserializer(item: any): GetSupportedLanguagesResult {
  return {
    translation: !item["translation"]
      ? item["translation"]
      : translationLanguageRecordDeserializer(item["translation"]),
    transliteration: !item["transliteration"]
      ? item["transliteration"]
      : transliterationLanguageRecordDeserializer(item["transliteration"]),
    models: !item["models"]
      ? item["models"]
      : item["models"].map((p: any) => {
          return p;
        }),
  };
}

export function translationLanguageRecordDeserializer(
  item: Record<string, any>,
): Record<string, TranslationLanguage> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : translationLanguageDeserializer(item[key]);
  });
  return result;
}

/**
 * The value of the translation property is a dictionary of (key, value) pairs. Each key is a BCP 47 language tag.
 * A key identifies a language for which text can be translated to or translated from.
 */
export interface TranslationLanguage {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionality;
  /** LLM models supported for translation. */
  readonly models: string[];
}

export function translationLanguageDeserializer(item: any): TranslationLanguage {
  return {
    name: item["name"],
    nativeName: item["nativeName"],
    dir: item["dir"],
    models: item["models"].map((p: any) => {
      return p;
    }),
  };
}

/** Language Directionality */
export type LanguageDirectionality = "ltr" | "rtl";

export function transliterationLanguageRecordDeserializer(
  item: Record<string, any>,
): Record<string, TransliterationLanguage> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : transliterationLanguageDeserializer(item[key]);
  });
  return result;
}

/**
 * The value of the transliteration property is a dictionary of (key, value) pairs.
 * Each key is a BCP 47 language tag. A key identifies a language for which text can be converted from one script
 * to another script.
 */
export interface TransliterationLanguage {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** List of scripts to convert from. */
  readonly scripts: TransliterableScript[];
}

export function transliterationLanguageDeserializer(item: any): TransliterationLanguage {
  return {
    name: item["name"],
    nativeName: item["nativeName"],
    scripts: transliterableScriptArrayDeserializer(item["scripts"]),
  };
}

export function transliterableScriptArrayDeserializer(result: Array<TransliterableScript>): any[] {
  return result.map((item) => {
    return transliterableScriptDeserializer(item);
  });
}

/** Script definition with list of script into which given script can be translitered. */
export interface TransliterableScript extends LanguageScript {
  /** List of scripts available to convert text to. */
  toScripts: LanguageScript[];
}

export function transliterableScriptDeserializer(item: any): TransliterableScript {
  return {
    code: item["code"],
    name: item["name"],
    nativeName: item["nativeName"],
    dir: item["dir"],
    toScripts: languageScriptArrayDeserializer(item["toScripts"]),
  };
}

export function languageScriptArrayDeserializer(result: Array<LanguageScript>): any[] {
  return result.map((item) => {
    return languageScriptDeserializer(item);
  });
}

/** Common properties of language script */
export interface LanguageScript {
  /** Code identifying the script. */
  code: string;
  /** Display name of the script in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for the language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionality;
}

export function languageScriptDeserializer(item: any): LanguageScript {
  return {
    code: item["code"],
    name: item["name"],
    nativeName: item["nativeName"],
    dir: item["dir"],
  };
}

/** Representation of the Error Response from Translator Service. */
export interface ErrorResponse {
  /** Error details. */
  error: ErrorDetails;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: errorDetailsDeserializer(item["error"]),
  };
}

/** Error details as returned by Translator Service. */
export interface ErrorDetails {
  /** String identifier of the error. */
  code: string;
  /** Human readable error description. */
  message: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Request data for translate. */
export interface TranslateBody {
  /** Array of the input text elements to translate. */
  inputs: TranslateInputItem[];
}

export function translateBodySerializer(item: TranslateBody): any {
  return { inputs: translateInputItemArraySerializer(item["inputs"]) };
}

export function translateInputItemArraySerializer(result: Array<TranslateInputItem>): any[] {
  return result.map((item) => {
    return translateInputItemSerializer(item);
  });
}

/** Element containing the text for translation. */
export interface TranslateInputItem {
  /** Text to translate. */
  text: string;
  /** Specifies the script of the input text. */
  script?: string;
  /**
   * Specifies the language of the input text. Find which languages are available to translate by
   * looking up supported languages using the translation scope. If the language parameter isn't
   * specified, automatic language detection is applied to determine the source language.
   *
   * You must use the language parameter rather than autodetection when using the dynamic dictionary feature.
   * Note: the dynamic dictionary feature is case-sensitive.
   */
  language?: string;
  /**
   * Defines whether the text being translated is plain text or HTML text. Any HTML needs to be a well-formed,
   * complete element. Possible values are: plain (default) or html.
   */
  textType?: TextType;
  /** Translation target parameters. */
  targets: TranslationTarget[];
}

export function translateInputItemSerializer(item: TranslateInputItem): any {
  return {
    text: item["text"],
    script: item["script"],
    language: item["language"],
    textType: item["textType"],
    targets: translationTargetArraySerializer(item["targets"]),
  };
}

/** Translation text type */
export type TextType = "Plain" | "Html";

export function translationTargetArraySerializer(result: Array<TranslationTarget>): any[] {
  return result.map((item) => {
    return translationTargetSerializer(item);
  });
}

/** Target language and translation configuration parameters. */
export interface TranslationTarget {
  /**
   * Specifies the language of the output text. The target language must be one of the supported languages included
   * in the translation scope. It's possible to translate to multiple languages simultaneously by including
   * multiple string values in the targetsLanguage array.
   */
  language: string;
  /** Specifies the script of the translated text. */
  script?: string;
  /**
   * Specifies how profanities should be treated in translations.
   * Possible values are: NoAction (default), Marked or Deleted.
   */
  profanityAction?: ProfanityAction;
  /**
   * Specifies how profanities should be marked in translations.
   * Possible values are: Asterisk (default) or Tag.
   */
  profanityMarker?: ProfanityMarker;
  /**
   * Default is 'general', which uses NMT system.
   * 'abc-inc-gpt-4o', and 'abc-inc-gpt-4o-mini' are examples of deployment names which use GPT-4o uses or
   * GPT-4o-mini model. 'gpt-4o' uses GPT-4o model.
   *
   * '<custom model id>' uses the custom NMT model tuned by customer.
   * 'best' system determines which is the best model to use for the request. This intelligence could be introduced
   * in future. Customer should have deployed it in their resource.
   *
   */
  deploymentName?: string;
  /**
   * In the case where a custom system is being used, specifies that the service is allowed to fall back to a
   * general system when a custom system doesn't exist.
   * In the case where a Large Language Model is being used, specifies that the service is allowed to fall
   * back to a Small Language Model if an error occurs.
   * Possible values are: true (default) or false.
   *
   * allowFallback=false specifies that the translation should only use systems trained for the category specified
   * by the request. If a translation for language X to language Y requires chaining through a pivot language E,
   * then all the systems in the chain (X → E and E → Y) will need to be custom and have the same category.
   * If no system is found with the specific category, the request will return a 400 status code. allowFallback=true
   * specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   */
  allowFallback?: boolean;
  /** Desired tone of target translation. Accepted values are formal, informal, or neutral. */
  tone?: TranslationTone;
  /** Desired gender of target translation. Accepted values are female, male, or neutral. */
  gender?: TranslationGender;
  /** Reference dataset ID having sentence pair to generate adaptive customized translation. */
  adaptiveDatasetId?: string;
  /** Reference text pairs to generate adaptive customized translation. */
  referenceTextPairs?: ReferenceTextPair[];
}

export function translationTargetSerializer(item: TranslationTarget): any {
  return {
    language: item["language"],
    script: item["script"],
    profanityAction: item["profanityAction"],
    profanityMarker: item["profanityMarker"],
    deploymentName: item["deploymentName"],
    allowFallback: item["allowFallback"],
    tone: item["tone"],
    gender: item["gender"],
    adaptiveDatasetId: item["adaptiveDatasetId"],
    referenceTextPairs: !item["referenceTextPairs"]
      ? item["referenceTextPairs"]
      : referenceTextPairArraySerializer(item["referenceTextPairs"]),
  };
}

/** Translator profanity actions */
export type ProfanityAction = "NoAction" | "Marked" | "Deleted";
/** Translator profanity markers */
export type ProfanityMarker = "Asterisk" | "Tag";
/** Desired tone for the translated text. */
export type TranslationTone = "neutral" | "formal" | "informal";
/** Desired gender for the translated text. */
export type TranslationGender = "neutral" | "male" | "female";

export function referenceTextPairArraySerializer(result: Array<ReferenceTextPair>): any[] {
  return result.map((item) => {
    return referenceTextPairSerializer(item);
  });
}

/** Reference text pair to generate adaptive customized translation. */
export interface ReferenceTextPair {
  /** Source reference sentence. */
  source: string;
  /** Target reference sentence. */
  target: string;
}

export function referenceTextPairSerializer(item: ReferenceTextPair): any {
  return { source: item["source"], target: item["target"] };
}

/** Response for the translation API. */
export interface TranslationResult {
  /** Array of the translated text elements. */
  readonly value: TranslatedTextItem[];
}

export function translationResultDeserializer(item: any): TranslationResult {
  return {
    value: translatedTextItemArrayDeserializer(item["value"]),
  };
}

export function translatedTextItemArrayDeserializer(result: Array<TranslatedTextItem>): any[] {
  return result.map((item) => {
    return translatedTextItemDeserializer(item);
  });
}

/** Element containing the translated text */
export interface TranslatedTextItem {
  /** The detectedLanguage property is only present in the result object when language auto-detection is requested. */
  detectedLanguage?: DetectedLanguage;
  /**
   * An array of translation results. The size of the array matches the number of target
   * languages specified through the to query parameter.
   */
  readonly translations: TranslationText[];
}

export function translatedTextItemDeserializer(item: any): TranslatedTextItem {
  return {
    detectedLanguage: !item["detectedLanguage"]
      ? item["detectedLanguage"]
      : detectedLanguageDeserializer(item["detectedLanguage"]),
    translations: translationTextArrayDeserializer(item["translations"]),
  };
}

/** An object describing the detected language. */
export interface DetectedLanguage {
  /** A string representing the code of the detected language. */
  language: string;
  /**
   * A float value indicating the confidence in the result.
   * The score is between zero and one and a low score indicates a low confidence.
   */
  score: number;
}

export function detectedLanguageDeserializer(item: any): DetectedLanguage {
  return {
    language: item["language"],
    score: item["score"],
  };
}

export function translationTextArrayDeserializer(result: Array<TranslationText>): any[] {
  return result.map((item) => {
    return translationTextDeserializer(item);
  });
}

/** Translation result */
export interface TranslationText {
  /** A string representing the language code of the target language. */
  language: string;
  /** An integer indicating the number of characters in the source text string */
  sourceCharacters?: number;
  /** An integer indicating the number of tokens used in generating the translated text */
  instructionTokens?: number;
  /** An integer indicating the number of tokens used in the source sentence */
  sourceTokens?: number;
  /** An integer indicating the number of tokens used in the translation response */
  responseTokens?: number;
  /** An integer indicating the number of tokens used in the target sentence */
  targetTokens?: number;
  /** A string giving the translated text. */
  text: string;
}

export function translationTextDeserializer(item: any): TranslationText {
  return {
    language: item["language"],
    sourceCharacters: item["sourceCharacters"],
    instructionTokens: item["instructionTokens"],
    sourceTokens: item["sourceTokens"],
    responseTokens: item["responseTokens"],
    targetTokens: item["targetTokens"],
    text: item["text"],
  };
}

/** Request data for transliterate. */
export interface TransliterateBody {
  /** Array of the input text elements to transliterate. */
  inputs: InputTextItem[];
}

export function transliterateBodySerializer(item: TransliterateBody): any {
  return { inputs: inputTextItemArraySerializer(item["inputs"]) };
}

export function inputTextItemArraySerializer(result: Array<InputTextItem>): any[] {
  return result.map((item) => {
    return inputTextItemSerializer(item);
  });
}

/** Element containing the text for translation. */
export interface InputTextItem {
  /** Text to translate. */
  text: string;
}

export function inputTextItemSerializer(item: InputTextItem): any {
  return { text: item["text"] };
}

/** Response for the transliteration API. */
export interface TransliterateResult {
  /** Array of transliterated texts */
  readonly value: TransliteratedText[];
}

export function transliterateResultDeserializer(item: any): TransliterateResult {
  return {
    value: transliteratedTextArrayDeserializer(item["value"]),
  };
}

export function transliteratedTextArrayDeserializer(result: Array<TransliteratedText>): any[] {
  return result.map((item) => {
    return transliteratedTextDeserializer(item);
  });
}

/** Transliterated text element. */
export interface TransliteratedText {
  /** A string which is the result of converting the input string to the output script. */
  text: string;
  /** A string specifying the script used in the output. */
  script: string;
}

export function transliteratedTextDeserializer(item: any): TransliteratedText {
  return {
    text: item["text"],
    script: item["script"],
  };
}

/** Text Translation supported versions */
export enum KnownAPIVersion {
  /** Version 3.0 */
  V30 = "3.0",
  /** Version 2026-06-06 */
  V20260606 = "2026-06-06",
}
