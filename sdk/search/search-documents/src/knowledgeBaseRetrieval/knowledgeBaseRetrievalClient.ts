// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createKnowledgeBaseRetrieval,
  KnowledgeBaseRetrievalContext,
  KnowledgeBaseRetrievalClientOptionalParams,
} from "./api/index.js";
import {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
} from "../models/azure/search/documents/knowledgeBases/models.js";
import { retrieve } from "./api/operations.js";
import { RetrieveOptionalParams } from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { KnowledgeBaseRetrievalClientOptionalParams } from "./api/knowledgeBaseRetrievalContext.js";

export class KnowledgeBaseRetrievalClient {
  private _client: KnowledgeBaseRetrievalContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: KnowledgeBaseRetrievalClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKnowledgeBaseRetrieval(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** KnowledgeBase retrieves relevant data from backing stores. */
  retrieve(
    knowledgeBaseName: string,
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeBaseRetrievalResponse> {
    return retrieve(this._client, knowledgeBaseName, retrievalRequest, options);
  }
}
