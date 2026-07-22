// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SingleDocumentTranslationContext,
  SingleDocumentTranslationClientOptionalParams,
} from "./api/index.js";
import { createSingleDocumentTranslation } from "./api/index.js";
import type { DocumentTranslateContent, TranslateResponse } from "../models/models.js";
import { translate } from "./api/operations.js";
import type { TranslateOptionalParams } from "./api/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SingleDocumentTranslationClientOptionalParams } from "./api/singleDocumentTranslationContext.js";

/**
 * Client for the Azure AI Document Translation service, used to translate a single document.
 */
export class SingleDocumentTranslationClient {
  private _client: SingleDocumentTranslationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Creates an instance of {@link SingleDocumentTranslationClient}.
   *
   * @param endpointParam - The Document Translation endpoint, for example `https://<resource-name>.cognitiveservices.azure.com`.
   * @param credential - A key credential or token credential used to authenticate requests to the service.
   * @param options - Options used to configure the client.
   */
  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: SingleDocumentTranslationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSingleDocumentTranslation(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Use this API to submit a single translation request to the Document Translation Service. */
  translate(
    targetLanguage: string,
    body: DocumentTranslateContent,
    options: TranslateOptionalParams = { requestOptions: {} },
  ): Promise<TranslateResponse> {
    return translate(this._client, targetLanguage, body, options);
  }
}
