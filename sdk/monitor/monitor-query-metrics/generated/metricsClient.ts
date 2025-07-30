// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createMetrics,
  MetricsContext,
  MetricsClientOptionalParams,
} from "./api/index.js";
import { queryResources } from "./api/operations.js";
import { QueryResourcesOptionalParams } from "./api/options.js";
import { ResourceIdList, MetricResultsResponse } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { MetricsClientOptionalParams } from "./api/metricsContext.js";

export class MetricsClient {
  private _client: MetricsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: MetricsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMetrics(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Lists the metric values for multiple resources. */
  queryResources(
    subscriptionId: string,
    metricNamespace: string,
    metricNames: string[],
    batchRequest: ResourceIdList,
    options: QueryResourcesOptionalParams = { requestOptions: {} },
  ): Promise<MetricResultsResponse> {
    return queryResources(
      this._client,
      subscriptionId,
      metricNamespace,
      metricNames,
      batchRequest,
      options,
    );
  }
}
