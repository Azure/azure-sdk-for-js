// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Response for the languages API. */
export interface GetSupportedLanguagesResultOutput {
  /** Languages that support translate API. */
  readonly translation?: Record<string, TranslationLanguageOutput>;
  /** Languages that support transliteration API. */
  readonly transliteration?: Record<string, TransliterationLanguageOutput>;
  /** LLM models supported. */
  readonly models?: string[];
}

/**
 * The value of the translation property is a dictionary of (key, value) pairs. Each key is a BCP 47 language tag.
 * A key identifies a language for which text can be translated to or translated from.
 */
export interface TranslationLanguageOutput {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionalityOutput;
  /** LLM models supported for translation. */
  readonly models: string[];
}

/**
 * The value of the transliteration property is a dictionary of (key, value) pairs.
 * Each key is a BCP 47 language tag. A key identifies a language for which text can be converted from one script
 * to another script.
 */
export interface TransliterationLanguageOutput {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** List of scripts to convert from. */
  readonly scripts: Array<TransliterableScriptOutput>;
}

/** Script definition with list of script into which given script can be translitered. */
export interface TransliterableScriptOutput extends LanguageScriptOutput {
  /** List of scripts available to convert text to. */
  toScripts: Array<LanguageScriptOutput>;
}

/** Common properties of language script */
export interface LanguageScriptOutput {
  /** Code identifying the script. */
  code: string;
  /** Display name of the script in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for the language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionalityOutput;
}

/** Representation of the Error Response from Translator Service. */
export interface ErrorResponseOutput {
  /** Error details. */
  error: ErrorDetailsOutput;
}

/** Error details as returned by Translator Service. */
export interface ErrorDetailsOutput {
  /** String identifier of the error. */
  code: string;
  /** Human readable error description. */
  message: string;
}

/** Response for the translation API. */
export interface TranslationResultOutput {
  /** Array of the translated text elements. */
  readonly value: Array<TranslatedTextItemOutput>;
}

/** Element containing the translated text */
export interface TranslatedTextItemOutput {
  /** The detectedLanguage property is only present in the result object when language auto-detection is requested. */
  detectedLanguage?: DetectedLanguageOutput;
  /**
   * An array of translation results. The size of the array matches the number of target
   * languages specified through the to query parameter.
   */
  readonly translations: Array<TranslationTextOutput>;
}

/** An object describing the detected language. */
export interface DetectedLanguageOutput {
  /** A string representing the code of the detected language. */
  language: string;
  /**
   * A float value indicating the confidence in the result.
   * The score is between zero and one and a low score indicates a low confidence.
   */
  score: number;
}

/** Translation result */
export interface TranslationTextOutput {
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

/** Response for the transliteration API. */
export interface TransliterateResultOutput {
  /** Array of transliterated texts */
  readonly value: Array<TransliteratedTextOutput>;
}

/** Transliterated text element. */
export interface TransliteratedTextOutput {
  /** A string which is the result of converting the input string to the output script. */
  text: string;
  /** A string specifying the script used in the output. */
  script: string;
}

/** Language Directionality */
export type LanguageDirectionalityOutput = "ltr" | "rtl";
