// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type {
  CorsOptions,
  KnowledgeSourceReference,
  KnowledgeBaseRetrieveDefaults,
} from "./models/azure/search/documents/indexes/index.js";
import type {
  KnowledgeBaseActivityRecordUnion,
  KnowledgeBaseReferenceUnion,
  KnowledgeRetrievalOutputMode,
  KnowledgeRetrievalReasoningEffortUnion,
  KnowledgeBaseRetrievalStartedEvent,
  KnowledgeBaseActivityStartedEvent,
  KnowledgeBaseAnswerCompletedEvent,
  KnowledgeBaseStreamErrorEvent,
  KnowledgeBaseResponseCompletedEvent,
  KnowledgeBaseRetrievalStatusCode,
} from "./models/azure/search/documents/knowledgeBases/index.js";

export type {
  KnowledgeBaseRetrievalStartedEvent,
  KnowledgeBaseActivityStartedEvent,
  KnowledgeBaseAnswerCompletedEvent,
  KnowledgeBaseStreamErrorEvent,
  KnowledgeBaseResponseCompletedEvent,
  KnowledgeBaseRetrievalStatusCode,
};
import type { KnowledgeBaseModel, SearchResourceEncryptionKey } from "./serviceModels.js";

/** Options for a completed knowledge base retrieval request. */
export interface RetrieveOptions extends OperationOptions {
  /**
   * Token identifying the user for which the query is being executed. This token is used to
   * enforce security restrictions on documents.
   */
  querySourceAuthorization?: string;
  /**
   * User assertion for a customer-owned Microsoft Entra application configured on a Work IQ
   * knowledge source. The service uses this assertion for on-behalf-of authentication to Work IQ.
   */
  queryWorkIQSourceAuthorization?: string;
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
  /**
   * User assertion for a customer-owned Microsoft Entra application configured on a Work IQ
   * knowledge source. The service uses this assertion for on-behalf-of authentication to Work IQ.
   */
  queryWorkIQSourceAuthorization?: string;
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

/** Defines a knowledge base and its stored retrieval configuration. */
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
   * User-defined metadata for organizing the knowledge base. Tags do not control billing
   * attribution or retrieval behavior.
   */
  tags?: Record<string, string>;
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
  /**
   * Persisted request-wide retrieve defaults for this knowledge base. These values apply to
   * retrieve requests that omit the corresponding fields; request-time values take precedence
   * when present.
   */
  retrieveDefaults?: KnowledgeBaseRetrieveDefaults;
}
