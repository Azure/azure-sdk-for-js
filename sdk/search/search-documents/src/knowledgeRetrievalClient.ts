// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  bearerTokenAuthenticationPolicyName,
} from "@azure/core-rest-pipeline";
import type {
  KnowledgeBaseRetrievalRequest,
  KnowledgeBaseRetrievalResponse,
} from "./models/azure/search/documents/knowledgeBases/index.js";
import {
  knowledgeBaseActivityRecordUnionDeserializer,
  knowledgeBaseActivityStartedEventDeserializer,
  knowledgeBaseAnswerCompletedEventDeserializer,
  knowledgeBaseReferenceUnionArrayDeserializer,
  knowledgeBaseResponseCompletedEventDeserializer,
  knowledgeBaseRetrievalStartedEventDeserializer,
  knowledgeBaseStreamErrorEventDeserializer,
} from "./models/azure/search/documents/knowledgeBases/models.js";
import type {
  KnowledgeBaseRetrievalClientOptionalParams,
  KnowledgeBaseRetrievalContext,
} from "./knowledgeBaseRetrieval/api/index.js";
import { createKnowledgeBaseRetrieval, retrieve } from "./knowledgeBaseRetrieval/api/index.js";
import { _retrieveStreamSend } from "./knowledgeBaseRetrieval/api/operations.js";
import type {
  KnowledgeBaseRetrievalStreamEvent,
  RetrieveOptions,
  RetrieveStreamOptions,
} from "./knowledgeBaseModels.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import * as utils from "./serviceUtils.js";
import { tracingClient } from "./tracing.js";
import type { ClientOptions } from "@azure-rest/core-client";
import { getSseStream } from "#platform/sseHelper";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface KnowledgeRetrievalClientOptions extends ClientOptions {
  /**
   * The service version to use when communicating with the service.
   */
  serviceVersion?: string;

  /**
   * The Audience to use for authentication with Azure Active Directory (AAD). The
   * audience is not considered when using a shared key.
   * {@link KnownSearchAudience} can be used interchangeably with audience
   */
  audience?: string;
}

/**
 * Class used to perform operations against a knowledge base.
 */
export class KnowledgeRetrievalClient {
  /// Maintenance note: when updating supported API versions,
  /// the ContinuationToken logic will need to be updated below.

  /**
   *  The service version to use when communicating with the service.
   */
  public readonly serviceVersion: string = utils.defaultServiceVersion;

  /**
   * The endpoint of the search service
   */
  public readonly endpoint: string;

  /**
   * The name of the knowledge base
   */
  public readonly knowledgeBaseName: string;

  /**
   * @hidden
   * A reference to the auto-generated KnowledgeRetrieval request context
   */
  private readonly client: KnowledgeBaseRetrievalContext;

  /**
   * A reference to the internal HTTP pipeline for use with raw requests
   */
  public readonly pipeline: Pipeline;

  /**
   * Creates an instance of KnowledgeRetrievalClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleKnowledgeRetrievalClient
   * import { KnowledgeRetrievalClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
   *   "<endpoint>",
   *   "<knowledgeBaseName>",
   *   new AzureKeyCredential("<apiKey>"),
   * );
   * ```
   
   * @param endpoint - The endpoint of the search service
   * @param knowledgeBaseName - The name of the knowledge base
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    knowledgeBaseName: string,
    credential: KeyCredential | TokenCredential,
    options: KnowledgeRetrievalClientOptions = {},
  ) {
    this.endpoint = endpoint;
    this.knowledgeBaseName = knowledgeBaseName;

    const internalClientPipelineOptions: KnowledgeBaseRetrievalClientOptionalParams = {
      ...options,
      apiVersion: options.serviceVersion ?? utils.defaultServiceVersion,
      ...{
        loggingOptions: {
          logger: logger.info,
          additionalAllowedHeaderNames: [
            "elapsed-time",
            "Location",
            "OData-MaxVersion",
            "OData-Version",
            "Prefer",
            "throttle-reason",
          ],
        },
      },
    };

    this.serviceVersion = options.serviceVersion ?? utils.defaultServiceVersion;

    this.client = createKnowledgeBaseRetrieval(
      endpoint,
      credential,
      knowledgeBaseName,
      internalClientPipelineOptions,
    );

    this.pipeline = this.client.pipeline;

    // Replaced with a custom policy below
    this.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });

    if (isTokenCredential(credential)) {
      const scope: string = options.audience
        ? `${options.audience}/.default`
        : `${KnownSearchAudience.AzurePublicCloud}/.default`;

      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: scope }),
      );
    } else {
      this.client.pipeline.addPolicy(createSearchApiKeyCredentialPolicy(credential));
    }

    this.client.pipeline.addPolicy(createOdataMetadataPolicy("none"));
  }

  /**
   * Retrieves relevant data from the backing stores configured by the knowledge base.
   * @param retrievalRequest - The retrieval request to process.
   * @param options - Options to the retrieve operation.
   * @returns The completed retrieval response.
   */
  public async retrieve(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveOptions = {},
  ): Promise<KnowledgeBaseRetrievalResponse> {
    return tracingClient.withSpan(
      "KnowledgeRetrievalClient-retrieve",
      options,
      async (updatedOptions) => {
        return retrieve(this.client, retrievalRequest, updatedOptions);
      },
    );
  }

  /**
   * Retrieves relevant data from the backing stores, streaming progress and results as
   * server-sent events as they become available instead of waiting for the full retrieval to
   * complete.
   *
   * The returned async iterable yields events until the terminal `response.completed` event, or
   * an `error` event if the retrieval fails after the stream has started. Narrow on the `event`
   * property to access the typed payload.
   *
   * @param retrievalRequest - The retrieval request to process.
   * @param options - Options to the retrieve stream operation.
   * @returns An async iterable of typed server-sent events.
   *
   * @example Iterate typed retrieval events.
   * ```ts snippet:ReadmeSampleRetrieveKnowledgeStream
   * import { KnowledgeRetrievalClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * const client = new KnowledgeRetrievalClient(
   *   "<endpoint>",
   *   "<knowledgeBaseName>",
   *   new AzureKeyCredential("<apiKey>"),
   * );
   *
   * for await (const event of await client.retrieveStream({
   *   intents: [{ type: "semantic", search: "Summarize the indexed information." }],
   *   includeActivity: true,
   * })) {
   *   if (event.event === "activity.completed") {
   *     console.log(`Activity ${event.data.id} took ${event.data.elapsedInMs}ms`);
   *   } else if (event.event === "response.completed") {
   *     console.log(event.data.response.response);
   *   } else if (event.event === "error") {
   *     throw new Error(event.data.error.message);
   *   }
   * }
   * ```
   */
  public async retrieveStream(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveStreamOptions = {},
  ): Promise<AsyncIterable<KnowledgeBaseRetrievalStreamEvent>> {
    return tracingClient.withSpan(
      "KnowledgeRetrievalClient-retrieveStream",
      options,
      async (updatedOptions) => {
        const streamableMethod = _retrieveStreamSend(this.client, retrievalRequest, updatedOptions);
        return deserializeRetrievalStream(await getSseStream(streamableMethod));
      },
    );
  }
}

/**
 * Converts the raw server-sent event messages into the public, strongly typed event union,
 * applying the generated deserializers so that wire values such as dates are converted.
 *
 * @internal
 */
export async function* deserializeRetrievalStream(
  events: AsyncIterable<{ event: string; data: string }>,
): AsyncIterable<KnowledgeBaseRetrievalStreamEvent> {
  for await (const event of events) {
    // The terminal SSE event carries no meaningful payload for some services; guard against it.
    if (!event.data) {
      continue;
    }

    switch (event.event) {
      case "retrieval.started":
        yield {
          event: "retrieval.started",
          data: knowledgeBaseRetrievalStartedEventDeserializer(JSON.parse(event.data)),
        };
        break;
      case "activity.started":
        yield {
          event: "activity.started",
          data: knowledgeBaseActivityStartedEventDeserializer(JSON.parse(event.data)),
        };
        break;
      case "activity.completed":
        yield {
          event: "activity.completed",
          data: knowledgeBaseActivityRecordUnionDeserializer(JSON.parse(event.data)),
        };
        break;
      case "answer.completed":
        yield {
          event: "answer.completed",
          data: knowledgeBaseAnswerCompletedEventDeserializer(JSON.parse(event.data)),
        };
        break;
      case "references.completed":
        yield {
          event: "references.completed",
          data: knowledgeBaseReferenceUnionArrayDeserializer(JSON.parse(event.data)),
        };
        break;
      case "error":
        yield {
          event: "error",
          data: knowledgeBaseStreamErrorEventDeserializer(JSON.parse(event.data)),
        };
        return;
      case "response.completed":
        yield {
          event: "response.completed",
          data: knowledgeBaseResponseCompletedEventDeserializer(JSON.parse(event.data)),
        };
        return;
      default:
        logger.warning(`Received unknown knowledge retrieval stream event "${event.event}"`);
        break;
    }
  }
}
