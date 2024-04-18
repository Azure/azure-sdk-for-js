// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Element containing the text for translation. */
export interface InputTextItem {
  /** Text to translate. */
  text: string;
}

/** Element containing the text with translation. */
export interface DictionaryExampleTextItem extends InputTextItem {
  /**
   * A string specifying the translated text previously returned by the Dictionary lookup operation.
   * This should be the value from the normalizedTarget field in the translations list of the Dictionary
   * lookup response. The service will return examples for the specific source-target word-pair.
   */
  translation: string;
}
