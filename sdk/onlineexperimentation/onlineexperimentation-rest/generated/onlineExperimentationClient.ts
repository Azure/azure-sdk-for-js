// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OnlineExperimentationContext,
  OnlineExperimentationClientOptionalParams,
  createOnlineExperimentation,
} from "./api/index.js";
import {
  listMetrics,
  deleteMetric,
  validateMetric,
  createOrUpdateMetric,
  getMetric,
} from "./api/operations.js";
import {
  ListMetricsOptionalParams,
  DeleteMetricOptionalParams,
  ValidateMetricOptionalParams,
  CreateOrUpdateMetricOptionalParams,
  GetMetricOptionalParams,
} from "./api/options.js";
import { ExperimentMetric, ExperimentMetricValidationResult } from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { OnlineExperimentationClientOptionalParams } from "./api/onlineExperimentationContext.js";

export class OnlineExperimentationClient {
  private _client: OnlineExperimentationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: OnlineExperimentationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createOnlineExperimentation(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Lists experiment metrics. */
  listMetrics(
    options: ListMetricsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ExperimentMetric> {
    return listMetrics(this._client, options);
  }

  /** Deletes an experiment metric. */
  deleteMetric(
    experimentMetricId: string,
    options: DeleteMetricOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteMetric(this._client, experimentMetricId, options);
  }

  /** Validates an experiment metric definition. */
  validateMetric(
    body: ExperimentMetric,
    options: ValidateMetricOptionalParams = { requestOptions: {} },
  ): Promise<ExperimentMetricValidationResult> {
    return validateMetric(this._client, body, options);
  }

  /** Creates or updates an experiment metric. */
  createOrUpdateMetric(
    experimentMetricId: string,
    resource: ExperimentMetric,
    options: CreateOrUpdateMetricOptionalParams = { requestOptions: {} },
  ): Promise<ExperimentMetric> {
    return createOrUpdateMetric(this._client, experimentMetricId, resource, options);
  }

  /** Fetches an experiment metric by ID. */
  getMetric(
    experimentMetricId: string,
    options: GetMetricOptionalParams = { requestOptions: {} },
  ): Promise<ExperimentMetric> {
    return getMetric(this._client, experimentMetricId, options);
  }
}
