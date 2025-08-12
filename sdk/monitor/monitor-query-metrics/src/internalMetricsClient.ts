// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MetricsContext, MetricsClientOptionalParams } from "./api/index.js";
import { createMetrics } from "./api/index.js";
import { queryResources } from "./api/operations.js";
import type { QueryResourcesOptionalParams } from "./api/options.js";
import type { ResourceIdList, MetricResultsResponse } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    const userAgentPrefix = prefixFromOptions;
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
