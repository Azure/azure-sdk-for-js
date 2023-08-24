// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { tracingClient } from "./tracing";
import {
  AzureMonitorMetricBatch as GeneratedMonitorMetricBatchClient,
  KnownApiVersion20230501Preview as MonitorMetricBatchApiVersion,
} from "./generated/metricBatch/src";
import {
  convertResponseForMetricBatch,
  convertRequestForMetricsBatchQuery,
} from "./internal/modelConverters";
import { SDK_VERSION } from "./constants";
import {
  MetricResultsResponseValuesItem,
  MetricsBatchOptionalParams,
} from "./models/publicBatchModels";

const defaultMetricsScope = "https://management.azure.com/.default";

/**
 * Options for the MetricsQueryClient.
 */
export interface MetricsBatchQueryClientOptions extends CommonClientOptions {
  /** Metrics scope */
  batchMetricsAuthScope?: string;
}

export const getSubscriptionFromResourceId = function (resourceId: string): string {
  const startPos: number = resourceId.indexOf("subscriptions/") + 14;
  const subscriptionId: string = resourceId.substring(startPos, resourceId.indexOf("/", startPos));
  return subscriptionId;
};

/**
 * A client that can query batch metrics.
 */
export class MetricsBatchQueryClient {
  private _metricBatchClient: GeneratedMonitorMetricBatchClient;
  private _baseUrl: string;

  constructor(
    batchEndPoint: string,
    tokenCredential: TokenCredential,
    options?: MetricsBatchQueryClientOptions
  ) {
    let scope;
    if (options?.batchMetricsAuthScope) {
      scope = `${options?.batchMetricsAuthScope}/.default`;
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
      $host: batchEndPoint,
      endpoint: batchEndPoint,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultMetricsScope,
      credential: tokenCredential,
      userAgentOptions: {
        userAgentPrefix,
      },
    };

    this._baseUrl = batchEndPoint;

    this._metricBatchClient = new GeneratedMonitorMetricBatchClient(
      MonitorMetricBatchApiVersion.TwoThousandTwentyThree0501Preview,
      serviceClientOptions
    );
  }

  /**
   * Returns all the Azure Monitor metrics requested for the batch of resources.
   */
  async queryBatch(
    resourceIds: string[],
    metricNamespace: string,
    metricNames: string[],
    options: MetricsBatchOptionalParams = {}
  ): Promise<MetricResultsResponseValuesItem[]> {
    if (resourceIds.length === 0) {
      throw new Error("Resource IDs can not be empty");
    }

    return tracingClient.withSpan(
      "MetricsBatchQueryClient.batch",
      options,
      async (updatedOptions) => {
        const subscriptionId = getSubscriptionFromResourceId(resourceIds[0]);

        const response = await this._metricBatchClient.metrics.batch(
          this._baseUrl,
          subscriptionId,
          metricNamespace,
          metricNames,
          {
            resourceids: resourceIds,
          },
          convertRequestForMetricsBatchQuery(updatedOptions)
        );

        return convertResponseForMetricBatch(response);
      }
    );
  }
}
