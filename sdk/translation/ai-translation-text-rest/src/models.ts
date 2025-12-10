// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Request data for translate. */
export interface TranslateBody {
  /** Array of the input text elements to translate. */
  inputs: Array<TranslateInputItem>;
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
   *
   * Possible values: "Plain", "Html"
   */
  textType?: TextType;
  /** Translation target parameters. */
  targets: Array<TranslationTarget>;
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
   * `<custom model id>` uses the custom NMT model tuned by customer.
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
  /** Defines complexity of LLM prompts to provide high accuracy translation. */
  grade?: string;
  /** Desired tone of target translation. */
  tone?: string;
  /** Desired gender of target translation. */
  gender?: string;
  /** Reference dataset ID having sentence pair to generate adaptive customized translation. */
  adaptiveDatasetId?: string;
  /** Reference text pairs to generate adaptive customized translation. */
  referenceTextPairs?: Array<ReferenceTextPair>;
}

/** Reference text pair to generate adaptive customized translation. */
export interface ReferenceTextPair {
  /** Source reference sentence. */
  source: string;
  /** Target reference sentence. */
  target: string;
}

/** Request data for transliterate. */
export interface TransliterateBody {
  /** Array of the input text elements to transliterate. */
  inputs: Array<InputTextItem>;
}

/** Element containing the text for translation. */
export interface InputTextItem {
  /** Text to translate. */
  text: string;
}

/** Alias for TextType */
export type TextType = string;
/** Translator profanity actions */
export type ProfanityAction = "NoAction" | "Marked" | "Deleted";
/** Translator profanity markers */
export type ProfanityMarker = "Asterisk" | "Tag";
