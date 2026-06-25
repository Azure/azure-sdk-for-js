// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TextTranslationContext,
  TextTranslationClientOptionalParams,
  createTextTranslation,
} from "./api/index.js";
import { transliterate, translate, getSupportedLanguages } from "./api/operations.js";
import {
  TransliterateOptionalParams,
  TranslateOptionalParams,
  GetSupportedLanguagesOptionalParams,
} from "./api/options.js";
import {
  GetSupportedLanguagesResult,
  TranslateBody,
  TranslationResult,
  TransliterateBody,
  TransliterateResult,
} from "./models/models.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { TextTranslationClientOptionalParams } from "./api/textTranslationContext.js";

export class TextTranslationClient {
  private _client: TextTranslationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Translator is a cloud-based, multilingual, neural machine translation service. The Text Translation API enables robust and scalable translation capabilities suitable for diverse applications. */
  constructor(
    endpointParam: string,
    credential: any | KeyCredential | TokenCredential,
    options: TextTranslationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createTextTranslation(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Transliterate Text */
  transliterate(
    language: string,
    fromScript: string,
    toScript: string,
    body: TransliterateBody,
    options: TransliterateOptionalParams = { requestOptions: {} },
  ): Promise<TransliterateResult> {
    return transliterate(this._client, language, fromScript, toScript, body, options);
  }

  /** Translate Text */
  translate(
    body: TranslateBody,
    options: TranslateOptionalParams = { requestOptions: {} },
  ): Promise<TranslationResult> {
    return translate(this._client, body, options);
  }

  /** Gets the set of languages currently supported by other operations of the Translator. */
  getSupportedLanguages(
    options: GetSupportedLanguagesOptionalParams = { requestOptions: {} },
  ): Promise<GetSupportedLanguagesResult> {
    return getSupportedLanguages(this._client, options);
  }
}
