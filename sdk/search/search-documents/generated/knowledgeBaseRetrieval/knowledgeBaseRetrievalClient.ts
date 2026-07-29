// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KnowledgeBaseRetrievalContext,
  KnowledgeBaseRetrievalClientOptionalParams,
  createKnowledgeBaseRetrieval,
} from "./api/index.js";
import {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
} from "../models/azure/search/documents/knowledgeBases/models.js";
import { retrieveStream, retrieve } from "./api/operations.js";
import { RetrieveStreamOptionalParams, RetrieveOptionalParams } from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { KnowledgeBaseRetrievalClientOptionalParams } from "./api/knowledgeBaseRetrievalContext.js";

export class KnowledgeBaseRetrievalClient {
  private _client: KnowledgeBaseRetrievalContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    knowledgeBaseName: string,
    options: KnowledgeBaseRetrievalClientOptionalParams = {},
  ) {
    this._client = createKnowledgeBaseRetrieval(
      endpointParam,
      credential,
      knowledgeBaseName,
      options,
    );
    this.pipeline = this._client.pipeline;
  }

  /**
   * KnowledgeBase retrieves relevant data from backing stores, streaming progress and results as
   * server-sent events on the same connection as they become available, instead of waiting for the
   * full retrieval to complete.
   */
  retrieveStream(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveStreamOptionalParams = { requestOptions: {} },
  ): Promise<Uint8Array> {
    return retrieveStream(this._client, retrievalRequest, options);
  }

  /** KnowledgeBase retrieves relevant data from backing stores. */
  retrieve(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeBaseRetrievalResponse> {
    return retrieve(this._client, retrievalRequest, options);
  }
}
