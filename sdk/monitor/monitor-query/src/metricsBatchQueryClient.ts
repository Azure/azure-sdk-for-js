// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { tracingClient } from "./tracing";
import {
  AzureMonitorMetricBatch as GeneratedMonitorMetricBatchClient,
  KnownApiVersion20230501Preview as MonitorMetricBatchApiVersion,
  MetricsBatchOptionalParams,
} from "./generated/metricBatch/src";
import { convertResponseForMetricBatch } from "./internal/modelConverters";
import { SDK_VERSION } from "./constants";
const defaultMetricsScope = "https://management.azure.com/.default";
import { MetricResultsResponseValuesItem } from "./models/publicBatchModels";

/**
 * Options for the MetricsQueryClient.
 */
export interface MetricsBatchQueryClientOptions extends CommonClientOptions {
  /** Overrides batch client endpoint. */
  batchendpoint?: string;
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

  constructor(tokenCredential: TokenCredential, options?: MetricsBatchQueryClientOptions) {
    let scope;
    if (options?.batchendpoint) {
      scope = `${options?.batchendpoint}/.default`;
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
      $host: options?.batchendpoint,
      endpoint: options?.batchendpoint,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultMetricsScope,
      credential: tokenCredential,
      userAgentOptions: {
        userAgentPrefix,
      },
    };

    this._baseUrl = serviceClientOptions.batchendpoint ?? "";

    this._metricBatchClient = new GeneratedMonitorMetricBatchClient(
      MonitorMetricBatchApiVersion.TwoThousandTwentyThree0501Preview,
      serviceClientOptions
    );
  }

  /**
   * Returns all the Azure Monitor metrics requested for the batch of resources.
   */
  async queryBatch(
    resourceids: string[],
    metricnamespace: string,
    metricnames: string[],
    options: MetricsBatchOptionalParams = {}
  ): Promise<MetricResultsResponseValuesItem[]> {
    if (resourceids.length === 0) {
      throw new Error("Resource IDs can not be empty");
    }

    return tracingClient.withSpan("MetricsBatchClient.batch", options, async (updatedOptions) => {
      const subscriptionId = getSubscriptionFromResourceId(resourceids[0]);

      const response = await this._metricBatchClient.metrics.batch(
        this._baseUrl,
        subscriptionId,
        metricnamespace,
        metricnames,
        {
          resourceids: resourceids,
        },
        updatedOptions
      );

      return convertResponseForMetricBatch(response);
    });
  }
}
