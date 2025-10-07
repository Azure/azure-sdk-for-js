// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { InternalClientPipelineOptions } from "@azure/core-client";
import type { ExtendedCommonClientOptions } from "@azure/core-http-compat";
import type { Pipeline } from "@azure/core-rest-pipeline";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import type {
  KnowledgeAgentRetrievalRequest,
  KnowledgeAgentRetrievalResponse,
} from "./generated/knowledgeAgent/index.js";
import { SearchClient as GeneratedClient } from "./generated/knowledgeAgent/searchClient.js";
import type { RetrieveKnowledgeOptions } from "./knowledgeAgentModels.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import * as utils from "./serviceUtils.js";
import { createSpan } from "./tracing.js";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface KnowledgeRetrievalClientOptions extends ExtendedCommonClientOptions {
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
 * Class used to perform operations against a knowledge agent.
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
   * The name of the knowledge agent
   */
  public readonly agentName: string;

  /**
   * @hidden
   * A reference to the auto-generated KnowledgeRetrievalClient
   */
  private readonly client: GeneratedClient;

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
   *   "<agentName>",
   *   new AzureKeyCredential("<apiKey>"),
   * );
   * ```
   
   * @param endpoint - The endpoint of the search service
   * @param agentName - The name of the knowledge agent
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    agentName: string,
    credential: KeyCredential | TokenCredential,
    options: KnowledgeRetrievalClientOptions = {},
  ) {
    this.endpoint = endpoint;
    this.agentName = agentName;

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...options,
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

    this.client = new GeneratedClient(
      this.endpoint,
      this.agentName,
      this.serviceVersion,
      internalClientPipelineOptions,
    );

    this.pipeline = this.client.pipeline;

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

  public async retrieveKnowledge(
    retrievalRequest: KnowledgeAgentRetrievalRequest,
    options?: RetrieveKnowledgeOptions,
  ): Promise<KnowledgeAgentRetrievalResponse> {
    const { span, updatedOptions } = createSpan(
      "KnowledgeRetrievalClient-retrieveKnowledge",
      options,
    );

    try {
      return await this.client.knowledgeRetrieval.retrieve(retrievalRequest, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
