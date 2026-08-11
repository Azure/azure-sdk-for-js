// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type {
  CorsOptions,
  KnowledgeSourceReference,
} from "./models/azure/search/documents/indexes/index.js";
import type {
  KnowledgeBaseActivityRecordType,
  KnowledgeBaseActivityRecordUnion,
  KnowledgeBaseErrorDetail,
  KnowledgeBaseMessage,
  KnowledgeBaseReferenceUnion,
  KnowledgeBaseRetrievalResponse,
  KnowledgeRetrievalOutputMode,
  KnowledgeRetrievalReasoningEffort,
  KnowledgeRetrievalReasoningEffortUnion,
} from "./models/azure/search/documents/knowledgeBases/index.js";
import type { KnowledgeBaseModel, SearchResourceEncryptionKey } from "./serviceModels.js";

export interface RetrieveOptions extends OperationOptions {
  /**
   * Token identifying the user for which the query is being executed. This token is used to
   * enforce security restrictions on documents.
   */
  querySourceAuthorization?: string;
}

/**
 * Options for the streaming knowledge base retrieval operation.
 */
export interface RetrieveStreamOptions extends OperationOptions {
  /**
   * Token identifying the user for which the query is being executed. This token is used to
   * enforce security restrictions on documents.
   */
  querySourceAuthorization?: string;
}

/**
 * Emitted once retrieval preflight validation completes, before any activity begins.
 */
export interface KnowledgeBaseRetrievalStartedEvent {
  /**
   * A service-generated identifier that correlates all events in this retrieval stream.
   */
  requestId: string;
  /**
   * The name of the knowledge base being queried.
   */
  knowledgeBaseName: string;
  /**
   * The effective output mode for this retrieval.
   */
  outputMode: KnowledgeRetrievalOutputMode;
  /**
   * The effective reasoning effort for this retrieval.
   */
  reasoningEffort: KnowledgeRetrievalReasoningEffort;
}

/**
 * Emitted immediately before an individual retrieval activity begins executing.
 */
export interface KnowledgeBaseActivityStartedEvent {
  /**
   * The ID of the activity record, matching the `id` on the corresponding activity completed event.
   */
  id: number;
  /**
   * The type of the activity that has started.
   */
  type: KnowledgeBaseActivityRecordType;
  /**
   * The time at which the activity started.
   */
  startedAt: Date;
  /**
   * The knowledge source used by the activity, when the activity targets a knowledge source.
   */
  knowledgeSourceName?: string;
}

/**
 * Emitted when a fully validated and post-processed synthesized answer is available.
 */
export interface KnowledgeBaseAnswerCompletedEvent {
  /**
   * The zero-based index of the completed message in the final response array.
   */
  messageIndex: number;
  /**
   * The completed answer message.
   */
  message: KnowledgeBaseMessage;
}

/**
 * Emitted in place of a response completed event if retrieval fails after the stream starts.
 */
export interface KnowledgeBaseStreamErrorEvent {
  /**
   * The error detail explaining why the retrieval stream failed.
   */
  error?: KnowledgeBaseErrorDetail;
  /**
   * Activity records that completed before the retrieval failed.
   */
  activity?: KnowledgeBaseActivityRecordUnion[];
}

/**
 * The semantic HTTP status of a completed streaming retrieval. `200` indicates the retrieval
 * completed successfully, `206` that it completed with partial results.
 */
export type KnowledgeBaseRetrievalStatusCode = number;

/**
 * Emitted after retrieval completes successfully. This is the final event of a successful stream.
 */
export interface KnowledgeBaseResponseCompletedEvent {
  /**
   * The semantic HTTP status of the completed retrieval.
   */
  statusCode: KnowledgeBaseRetrievalStatusCode;
  /**
   * The authoritative completed retrieval response.
   */
  response: KnowledgeBaseRetrievalResponse;
}

/**
 * The set of server-sent events emitted while streaming a knowledge base retrieval.
 *
 * The stream ends after the terminal `response.completed` event, or after an `error` event if the
 * retrieval fails before completing. Narrow on the `event` property to access the typed payload.
 */
export type KnowledgeBaseRetrievalStreamEvent =
  | {
      /** The retrieval stream has started; no activity or answer content has been produced yet. */
      event: "retrieval.started";
      data: KnowledgeBaseRetrievalStartedEvent;
    }
  | {
      /** An individual activity (e.g. a search index or web retrieval step) has started executing. */
      event: "activity.started";
      data: KnowledgeBaseActivityStartedEvent;
    }
  | {
      /** An individual activity has finished executing, successfully or not. */
      event: "activity.completed";
      data: KnowledgeBaseActivityRecordUnion;
    }
  | {
      /** The answer message has finished streaming and is now complete. */
      event: "answer.completed";
      data: KnowledgeBaseAnswerCompletedEvent;
    }
  | {
      /** The references used to produce the response are available. */
      event: "references.completed";
      data: KnowledgeBaseReferenceUnion[];
    }
  | {
      /** The retrieval failed before the stream could complete normally. */
      event: "error";
      data: KnowledgeBaseStreamErrorEvent;
    }
  | {
      /** The retrieval has completed successfully; this is the final event of the stream. */
      event: "response.completed";
      data: KnowledgeBaseResponseCompletedEvent;
    };

export interface KnowledgeBase {
  /**
   * The name of the knowledge base.
   */
  name: string;
  /**
   * Knowledge sources referenced by this knowledge base.
   */
  knowledgeSources: KnowledgeSourceReference[];
  /**
   * Contains configuration options on how to connect to AI models.
   */
  models?: KnowledgeBaseModel[];
  /**
   * The retrieval reasoning effort configuration applied at retrieval time.
   */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
  /**
   * The output mode for the knowledge base.
   */
  outputMode?: KnowledgeRetrievalOutputMode;
  /**
   * The ETag of the knowledge base.
   */
  etag?: string;
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your knowledge base definition when you want full assurance that no one, not even Microsoft, can decrypt them. Once you have encrypted your knowledge base definition, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your knowledge base definition will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The description of the knowledge base.
   */
  description?: string;
  /**
   * Instructions considered by the knowledge base when developing the query plan.
   */
  retrievalInstructions?: string;
  /**
   * Instructions considered by the knowledge base when generating answers.
   */
  answerInstructions?: string;
  /**
   * Options to control Cross-Origin Resource Sharing (CORS) for the knowledge base.
   */
  corsOptions?: CorsOptions;
}
