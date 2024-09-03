// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Response for the languages API. */
export interface GetSupportedLanguagesResultOutput {
  /** Languages that support translate API. */
  translation?: Record<string, TranslationLanguageOutput>;
  /** Languages that support transliteration API. */
  transliteration?: Record<string, TransliterationLanguageOutput>;
  /** Languages that support dictionary API. */
  dictionary?: Record<string, SourceDictionaryLanguageOutput>;
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
  scripts: Array<TransliterableScriptOutput>;
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

/** Properties ot the source dictionary language */
export interface SourceDictionaryLanguageOutput {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionalityOutput;
  /** List of languages with alterative translations and examples for the query expressed in the source language. */
  translations: Array<TargetDictionaryLanguageOutput>;
}

/** Properties of the target dictionary language */
export interface TargetDictionaryLanguageOutput {
  /** Display name of the language in the locale requested via Accept-Language header. */
  name: string;
  /** Display name of the language in the locale native for this language. */
  nativeName: string;
  /** Directionality, which is rtl for right-to-left languages or ltr for left-to-right languages. */
  dir: LanguageDirectionalityOutput;
  /** Language code identifying the target language. */
  code: string;
}

/** Representation of the Error Response from Translator Service. */
export interface ErrorResponseOutput {
  /** Error details. */
  error: ErrorDetailsOutput;
}

/** Error details as returned by Translator Service. */
export interface ErrorDetailsOutput {
  /** Number identifier of the error. */
  code: number;
  /** Human readable error description. */
  message: string;
}

/** Element containing the translated text */
export interface TranslatedTextItemOutput {
  /** The detectedLanguage property is only present in the result object when language auto-detection is requested. */
  detectedLanguage?: DetectedLanguageOutput;
  /**
   * An array of translation results. The size of the array matches the number of target
   * languages specified through the to query parameter.
   */
  translations: Array<TranslationTextOutput>;
  /**
   * Input text in the default script of the source language. sourceText property is present only when
   * the input is expressed in a script that's not the usual script for the language. For example,
   * if the input were Arabic written in Latin script, then sourceText.text would be the same Arabic text
   * converted into Arab script.
   */
  sourceText?: SourceTextOutput;
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
  to: string;
  /** A string giving the translated text. */
  text: string;
  /** An object giving the translated text in the script specified by the toScript parameter. */
  transliteration?: TransliteratedTextOutput;
  /** Alignment information. */
  alignment?: TranslatedTextAlignmentOutput;
  /** Sentence boundaries in the input and output texts. */
  sentLen?: SentenceBoundariesOutput;
}

/** Transliterated text element. */
export interface TransliteratedTextOutput {
  /** A string which is the result of converting the input string to the output script. */
  text: string;
  /** A string specifying the script used in the output. */
  script: string;
}

/** Alignment information object. */
export interface TranslatedTextAlignmentOutput {
  /**
   * Maps input text to translated text. The alignment information is only provided when the request
   * parameter includeAlignment is true. Alignment is returned as a string value of the following
   * format: [[SourceTextStartIndex]:[SourceTextEndIndex]–[TgtTextStartIndex]:[TgtTextEndIndex]].
   * The colon separates start and end index, the dash separates the languages, and space separates the words.
   * One word may align with zero, one, or multiple words in the other language, and the aligned words may
   * be non-contiguous. When no alignment information is available, the alignment element will be empty.
   */
  proj: string;
}

/** An object returning sentence boundaries in the input and output texts. */
export interface SentenceBoundariesOutput {
  /**
   * An integer array representing the lengths of the sentences in the input text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  srcSentLen: number[];
  /**
   * An integer array representing the lengths of the sentences in the translated text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  transSentLen: number[];
}

/** Input text in the default script of the source language. */
export interface SourceTextOutput {
  /** Input text in the default script of the source language. */
  text: string;
}

/** Item containing break sentence result. */
export interface BreakSentenceItemOutput {
  /** The detectedLanguage property is only present in the result object when language auto-detection is requested. */
  detectedLanguage?: DetectedLanguageOutput;
  /**
   * An integer array representing the lengths of the sentences in the input text.
   * The length of the array is the number of sentences, and the values are the length of each sentence.
   */
  sentLen: number[];
}

/** Dictionary Lookup Element */
export interface DictionaryLookupItemOutput {
  /**
   * A string giving the normalized form of the source term.
   * For example, if the request is "JOHN", the normalized form will be "john".
   * The content of this field becomes the input to lookup examples.
   */
  normalizedSource: string;
  /**
   * A string giving the source term in a form best suited for end-user display.
   * For example, if the input is "JOHN", the display form will reflect the usual
   * spelling of the name: "John".
   */
  displaySource: string;
  /** A list of translations for the source term. */
  translations: Array<DictionaryTranslationOutput>;
}

/** Translation source term. */
export interface DictionaryTranslationOutput {
  /**
   * A string giving the normalized form of this term in the target language.
   * This value should be used as input to lookup examples.
   */
  normalizedTarget: string;
  /**
   * A string giving the term in the target language and in a form best suited
   * for end-user display. Generally, this will only differ from the normalizedTarget
   * in terms of capitalization. For example, a proper noun like "Juan" will have
   * normalizedTarget = "juan" and displayTarget = "Juan".
   */
  displayTarget: string;
  /** A string associating this term with a part-of-speech tag. */
  posTag: string;
  /**
   * A value between 0.0 and 1.0 which represents the "confidence"
   * (or perhaps more accurately, "probability in the training data") of that translation pair.
   * The sum of confidence scores for one source word may or may not sum to 1.0.
   */
  confidence: number;
  /**
   * A string giving the word to display as a prefix of the translation. Currently,
   * this is the gendered determiner of nouns, in languages that have gendered determiners.
   * For example, the prefix of the Spanish word "mosca" is "la", since "mosca" is a feminine noun in Spanish.
   * This is only dependent on the translation, and not on the source.
   * If there is no prefix, it will be the empty string.
   */
  prefixWord: string;
  /**
   * A list of "back translations" of the target. For example, source words that the target can translate to.
   * The list is guaranteed to contain the source word that was requested (e.g., if the source word being
   * looked up is "fly", then it is guaranteed that "fly" will be in the backTranslations list).
   * However, it is not guaranteed to be in the first position, and often will not be.
   */
  backTranslations: Array<BackTranslationOutput>;
}

/** Back Translation */
export interface BackTranslationOutput {
  /**
   * A string giving the normalized form of the source term that is a back-translation of the target.
   * This value should be used as input to lookup examples.
   */
  normalizedText: string;
  /**
   * A string giving the source term that is a back-translation of the target in a form best
   * suited for end-user display.
   */
  displayText: string;
  /**
   * An integer representing the number of examples that are available for this translation pair.
   * Actual examples must be retrieved with a separate call to lookup examples. The number is mostly
   * intended to facilitate display in a UX. For example, a user interface may add a hyperlink
   * to the back-translation if the number of examples is greater than zero and show the back-translation
   * as plain text if there are no examples. Note that the actual number of examples returned
   * by a call to lookup examples may be less than numExamples, because additional filtering may be
   * applied on the fly to remove "bad" examples.
   */
  numExamples: number;
  /**
   * An integer representing the frequency of this translation pair in the data. The main purpose of this
   * field is to provide a user interface with a means to sort back-translations so the most frequent terms are first.
   */
  frequencyCount: number;
}

/** Dictionary Example element */
export interface DictionaryExampleItemOutput {
  /**
   * A string giving the normalized form of the source term. Generally, this should be identical
   * to the value of the Text field at the matching list index in the body of the request.
   */
  normalizedSource: string;
  /**
   * A string giving the normalized form of the target term. Generally, this should be identical
   * to the value of the Translation field at the matching list index in the body of the request.
   */
  normalizedTarget: string;
  /** A list of examples for the (source term, target term) pair. */
  examples: Array<DictionaryExampleOutput>;
}

/** Dictionary Example */
export interface DictionaryExampleOutput {
  /**
   * The string to concatenate before the value of sourceTerm to form a complete example.
   * Do not add a space character, since it is already there when it should be.
   * This value may be an empty string.
   */
  sourcePrefix: string;
  /**
   * A string equal to the actual term looked up. The string is added with sourcePrefix
   * and sourceSuffix to form the complete example. Its value is separated so it can be
   * marked in a user interface, e.g., by bolding it.
   */
  sourceTerm: string;
  /**
   * The string to concatenate after the value of sourceTerm to form a complete example.
   * Do not add a space character, since it is already there when it should be.
   * This value may be an empty string.
   */
  sourceSuffix: string;
  /** A string similar to sourcePrefix but for the target. */
  targetPrefix: string;
  /** A string similar to sourceTerm but for the target. */
  targetTerm: string;
  /** A string similar to sourceSuffix but for the target. */
  targetSuffix: string;
}

/** Language Directionality */
export type LanguageDirectionalityOutput = "ltr" | "rtl";
