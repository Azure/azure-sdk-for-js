// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KnowledgeBaseRetrievalContext,
  KnowledgeBaseRetrievalClientOptionalParams,
} from "./api/index.js";
import { createKnowledgeBaseRetrieval } from "./api/index.js";
import type {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
  KnowledgeBaseRetrievalStartedEvent,
  KnowledgeBaseActivityStartedEvent,
  KnowledgeBaseActivityRecordUnion,
  KnowledgeBaseAnswerCompletedEvent,
  KnowledgeBaseReferenceUnion,
  KnowledgeBaseStreamErrorEvent,
  KnowledgeBaseResponseCompletedEvent,
} from "../models/azure/search/documents/knowledgeBases/models.js";
import { retrieveStream, retrieve } from "./api/operations.js";
import type { RetrieveStreamOptionalParams, RetrieveOptionalParams } from "./api/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
   * Retrieves relevant data from backing stores and streams progress and results as server-sent
   * events.
   *
   * Narrow on the `event` property to access each typed payload. The stream closes at either
   * `response.completed` or `error`, or when iteration ends early.
   *
   * @param retrievalRequest - The retrieval request to process.
   * @param options - Options for the streaming retrieval operation.
   * @returns An async iterable of typed server-sent events.
   */
  retrieveStream(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveStreamOptionalParams = { requestOptions: {} },
  ): Promise<
    AsyncIterable<
      | { event: "retrieval.started"; data: KnowledgeBaseRetrievalStartedEvent }
      | { event: "activity.started"; data: KnowledgeBaseActivityStartedEvent }
      | { event: "activity.completed"; data: KnowledgeBaseActivityRecordUnion }
      | { event: "answer.completed"; data: KnowledgeBaseAnswerCompletedEvent }
      | { event: "references.completed"; data: KnowledgeBaseReferenceUnion[] }
      | { event: "error"; data: KnowledgeBaseStreamErrorEvent }
      | { event: "response.completed"; data: KnowledgeBaseResponseCompletedEvent }
    >
  > {
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
