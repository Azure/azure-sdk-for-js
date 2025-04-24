// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createImpact, ImpactContext, ImpactClientOptionalParams } from "./api/index.js";
import { ConnectorsOperations, _getConnectorsOperations } from "./classic/connectors/index.js";
import { InsightsOperations, _getInsightsOperations } from "./classic/insights/index.js";
import {
  ImpactCategoriesOperations,
  _getImpactCategoriesOperations,
} from "./classic/impactCategories/index.js";
import {
  WorkloadImpactsOperations,
  _getWorkloadImpactsOperations,
} from "./classic/workloadImpacts/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ImpactClientOptionalParams } from "./api/impactContext.js";

export class ImpactClient {
  private _client: ImpactContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ImpactClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createImpact(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.connectors = _getConnectorsOperations(this._client);
    this.insights = _getInsightsOperations(this._client);
    this.impactCategories = _getImpactCategoriesOperations(this._client);
    this.workloadImpacts = _getWorkloadImpactsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for connectors */
  public readonly connectors: ConnectorsOperations;
  /** The operation groups for insights */
  public readonly insights: InsightsOperations;
  /** The operation groups for impactCategories */
  public readonly impactCategories: ImpactCategoriesOperations;
  /** The operation groups for workloadImpacts */
  public readonly workloadImpacts: WorkloadImpactsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
