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
import type { KnowledgeBaseRetrievalClientOptionalParams } from "./knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.js";
import { KnowledgeBaseRetrievalClient as GeneratedClient } from "./knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.js";
import type { RetrieveKnowledgeOptions } from "./knowledgeBaseModels.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import * as utils from "./serviceUtils.js";
import { tracingClient } from "./tracing.js";
import type { ClientOptions } from "@azure-rest/core-client";

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

    this.client = new GeneratedClient(endpoint, credential, internalClientPipelineOptions);

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

  public async retrieveKnowledge(
    retrievalRequest: KnowledgeBaseRetrievalRequest,
    options: RetrieveKnowledgeOptions = {},
  ): Promise<KnowledgeBaseRetrievalResponse> {
    return tracingClient.withSpan(
      "KnowledgeRetrievalClient-retrieveKnowledge",
      options,
      async (updatedOptions) => {
        return this.client.retrieve(this.knowledgeBaseName, retrievalRequest, updatedOptions);
      },
    );
  }
}
