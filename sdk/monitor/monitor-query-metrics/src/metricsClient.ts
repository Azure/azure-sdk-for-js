// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { MetricsClient as InternalMetricsClient } from "./internalMetricsClient.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import {
  mapToInternalQueryOptions,
  createMetricsQueryResult,
  getSubscriptionFromResourceId,
} from "./utils.js";
import {
  KnownMonitorMetricsQueryAudience,
  type MetricsClientOptions,
  type MetricsQueryResourcesOptions,
  type MetricsQueryResult,
} from "./models.js";

/**
 * Client for querying Azure Monitor metrics.
 */
export class MetricsClient {
  private readonly _client: InternalMetricsClient;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Create a new MetricsClient.
   * @param endpoint - The endpoint URL for the metrics service.
   * @param tokenCredential - The token credential to use for authentication.
   * @param options - Optional configuration options.
   */
  constructor(
    endpoint: string,
    tokenCredential: TokenCredential,
    options: MetricsClientOptions = {},
  ) {
    this._client = new InternalMetricsClient(endpoint, tokenCredential, {
      ...options,
      credentials: {
        scopes: options.credentials?.scopes ?? [
          options.audience ?? KnownMonitorMetricsQueryAudience.AzurePublicCloud + "/.default",
        ],
      },
    });
    this.pipeline = this._client.pipeline;
  }

  /**
   * Query metrics for multiple Azure resources.
   * @param resourceIds - Array of resource IDs to query metrics for.
   * @param metricNames - Array of metric names to query.
   * @param metricNamespace - The namespace of the metrics.
   * @param options - Optional query parameters.
   * @returns Promise resolving to an array of metrics query results.
   */
  async queryResources(
    resourceIds: string[],
    metricNames: string[],
    metricNamespace: string,
    options: MetricsQueryResourcesOptions = {},
  ): Promise<MetricsQueryResult[]> {
    // Extract subscription ID from the first resource ID
    // Format: /subscriptions/{subscriptionId}/...
    const subscriptionId = getSubscriptionFromResourceId(resourceIds[0]);

    const internalOptions = mapToInternalQueryOptions(options);

    const response = await this._client.queryResources(
      subscriptionId,
      metricNamespace,
      metricNames,
      { resourceids: resourceIds },
      internalOptions,
    );

    // Convert the response to the expected format
    return (response.values || []).map(createMetricsQueryResult);
  }
}
