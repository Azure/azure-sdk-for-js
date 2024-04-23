// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { tracingClient } from "./tracing";
import {
  AzureMonitorMetricBatch as GeneratedMonitorMetricClient,
  KnownApiVersion20240201 as MonitorMetricBatchApiVersion,
} from "./generated/metricBatch/src";
import {
  convertResponseForMetricBatch,
  convertRequestForMetricsBatchQuery,
} from "./internal/modelConverters";
import { SDK_VERSION } from "./constants";
import { MetricsQueryResourcesOptions } from "./models/publicBatchModels";
import { MetricsQueryResult } from "./models/publicMetricsModels";

const defaultMetricsScope = "https://management.azure.com/.default";

export const getSubscriptionFromResourceId = function (resourceId: string): string {
  const startPos: number = resourceId.indexOf("subscriptions/") + 14;
  const subscriptionId: string = resourceId.substring(startPos, resourceId.indexOf("/", startPos));
  return subscriptionId;
};

/**
 * A client that can query batch metrics.
 */
export class MetricsClient {
  private _metricBatchClient: GeneratedMonitorMetricClient;
  private _baseUrl: string;

  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  constructor(endpoint: string, tokenCredential: TokenCredential, options?: CommonClientOptions) {
    let scope;
    if (endpoint) {
      scope = `${endpoint}/.default`;
    }
    const credentialOptions = {
      credentialScopes: scope,
    };
    const packageDetails = `azsdk-js-monitor-query/${SDK_VERSION}`;
    const userAgentPrefix =
      options?.userAgentOptions && options?.userAgentOptions.userAgentPrefix
        ? `${options?.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;
    const serviceClientOptions = {
      ...options,
      $host: endpoint,
      endpoint: endpoint,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultMetricsScope,
      credential: tokenCredential,
      userAgentOptions: {
        userAgentPrefix,
      },
    };

    this._baseUrl = endpoint;

    this._metricBatchClient = new GeneratedMonitorMetricClient(
      this._baseUrl,
      MonitorMetricBatchApiVersion.TwoThousandTwentyFour0201,
      serviceClientOptions,
    );
  }

  /**
   * Returns all the Azure Monitor metrics requested for the batch of resources.
   */
  async queryResources(
    resourceIds: string[],
    metricNames: string[],
    metricNamespace: string,
    options: MetricsQueryResourcesOptions = {},
  ): Promise<MetricsQueryResult[]> {
    if (resourceIds.length === 0) {
      throw new Error("Resource IDs can not be empty");
    }

    return tracingClient.withSpan("MetricsQueryClient.batch", options, async (updatedOptions) => {
      const subscriptionId = getSubscriptionFromResourceId(resourceIds[0]);

      const response = await this._metricBatchClient.metricsBatch.batch(
        subscriptionId,
        metricNamespace,
        metricNames,
        {
          resourceids: resourceIds,
        },
        convertRequestForMetricsBatchQuery(updatedOptions),
      );

      return convertResponseForMetricBatch(response);
    });
  }
}
