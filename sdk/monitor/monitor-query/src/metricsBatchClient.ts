// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { tracingClient } from "./tracing";
import {
  AzureMonitorMetricBatch as GeneratedMonitorMetricBatchClient,
  KnownApiVersion20230501Preview as MonitorMetricBatchApiVersion,
  MetricResultsResponseValuesItem,
  MetricsBatchOptionalParams,
} from "./generated/metricBatch/src";
import { convertResponseForMetricBatch } from "./internal/modelConverters";
import { SDK_VERSION } from "./constants";
import { MetricsBatchOptions } from "./models/publicMetricsModels";
const defaultMetricsScope = "https://management.azure.com/.default";

/**
 * Options for the MetricsQueryClient.
 */
export interface MetricsBatchClientOptions extends CommonClientOptions {
  /** Overrides batch client endpoint. */
  batchendpoint?: string;
}

/**
 * A client that can query batch metrics.
 */
export class MetricsBatchClient {
  private _metricBatchClient: GeneratedMonitorMetricBatchClient;

  constructor(tokenCredential: TokenCredential, options?: MetricsBatchClientOptions) {
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

    this._metricBatchClient = new GeneratedMonitorMetricBatchClient(
      serviceClientOptions.batchendpoint ?? "",
      MonitorMetricBatchApiVersion.TwoThousandTwentyThree0501Preview,
      serviceClientOptions
    );
  }

  private async *listSegmentOfMetricBatch(
    subscriptionId: string,
    metricnamespace: string,
    metricnames: string[],
    options: MetricsBatchOptions = {}
  ): AsyncIterableIterator<Array<MetricResultsResponseValuesItem>> {
    const segmentResponse = await tracingClient.withSpan(
      "MetricsQueryClient.listSegmentOfMetricBatch",
      options,
      async (updatedOptions: MetricsBatchOptionalParams | undefined) =>
        this._metricBatchClient.metrics.batch(
          subscriptionId,
          metricnamespace,
          metricnames,
          {
            resourceids: options.resourceids,
          },
          updatedOptions
        )
    );
    yield convertResponseForMetricBatch(segmentResponse.values);
  }
  private async *listItemsOfMetricBatch(
    subscriptionId: string,
    metricnamespace: string,
    metricnames: string[],
    options?: MetricsBatchOptions
  ): AsyncIterableIterator<MetricResultsResponseValuesItem> {
    for await (const segment of this.listSegmentOfMetricBatch(
      subscriptionId,
      metricnamespace,
      metricnames,
      options
    )) {
      if (segment) {
        yield* segment;
      }
    }
  }
  batch(
    subscriptionId: string,
    metricnamespace: string,
    metricnames: string[],
    options?: MetricsBatchOptions
  ): PagedAsyncIterableIterator<MetricResultsResponseValuesItem> {
    const iter = this.listItemsOfMetricBatch(subscriptionId, metricnamespace, metricnames, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns an AsyncIterableIterator that works a page at a time
       */
      byPage: () => {
        return this.listSegmentOfMetricBatch(subscriptionId, metricnamespace, metricnames, options);
      },
    };
  }
}
