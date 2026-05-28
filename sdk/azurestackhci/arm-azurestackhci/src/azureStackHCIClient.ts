// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureStackHCIContext,
  AzureStackHCIClientOptionalParams,
  createAzureStackHCI,
} from "./api/index.js";
import { ArcSettingsOperations, _getArcSettingsOperations } from "./classic/arcSettings/index.js";
import { ClustersOperations, _getClustersOperations } from "./classic/clusters/index.js";
import {
  DeploymentSettingsOperations,
  _getDeploymentSettingsOperations,
} from "./classic/deploymentSettings/index.js";
import {
  EdgeDeviceJobsOperations,
  _getEdgeDeviceJobsOperations,
} from "./classic/edgeDeviceJobs/index.js";
import { EdgeDevicesOperations, _getEdgeDevicesOperations } from "./classic/edgeDevices/index.js";
import { ExtensionsOperations, _getExtensionsOperations } from "./classic/extensions/index.js";
import { OffersOperations, _getOffersOperations } from "./classic/offers/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SecuritySettingsOperations,
  _getSecuritySettingsOperations,
} from "./classic/securitySettings/index.js";
import { SkusOperations, _getSkusOperations } from "./classic/skus/index.js";
import { UpdateRunsOperations, _getUpdateRunsOperations } from "./classic/updateRuns/index.js";
import {
  UpdateSummariesOperations,
  _getUpdateSummariesOperations,
} from "./classic/updateSummaries/index.js";
import {
  UpdateSummariesOperationGroupOperations,
  _getUpdateSummariesOperationGroupOperations,
} from "./classic/updateSummariesOperationGroup/index.js";
import { UpdatesOperations, _getUpdatesOperations } from "./classic/updates/index.js";
import {
  ValidatedSolutionRecipesOperations,
  _getValidatedSolutionRecipesOperations,
} from "./classic/validatedSolutionRecipes/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureStackHCIClientOptionalParams } from "./api/azureStackHCIContext.js";

export class AzureStackHCIClient {
  private _client: AzureStackHCIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureStackHCIClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureStackHCIClientOptionalParams,
  );
  /** Azure Stack HCI service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureStackHCIClientOptionalParams,
    options?: AzureStackHCIClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureStackHCI(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.updateSummaries = _getUpdateSummariesOperations(this._client);
    this.validatedSolutionRecipes = _getValidatedSolutionRecipesOperations(this._client);
    this.updateSummariesOperationGroup = _getUpdateSummariesOperationGroupOperations(this._client);
    this.updates = _getUpdatesOperations(this._client);
    this.updateRuns = _getUpdateRunsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.securitySettings = _getSecuritySettingsOperations(this._client);
    this.extensions = _getExtensionsOperations(this._client);
    this.edgeDevices = _getEdgeDevicesOperations(this._client);
    this.edgeDeviceJobs = _getEdgeDeviceJobsOperations(this._client);
    this.deploymentSettings = _getDeploymentSettingsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.offers = _getOffersOperations(this._client);
    this.arcSettings = _getArcSettingsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for updateSummaries */
  public readonly updateSummaries: UpdateSummariesOperations;
  /** The operation groups for validatedSolutionRecipes */
  public readonly validatedSolutionRecipes: ValidatedSolutionRecipesOperations;
  /** The operation groups for updateSummariesOperationGroup */
  public readonly updateSummariesOperationGroup: UpdateSummariesOperationGroupOperations;
  /** The operation groups for updates */
  public readonly updates: UpdatesOperations;
  /** The operation groups for updateRuns */
  public readonly updateRuns: UpdateRunsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for securitySettings */
  public readonly securitySettings: SecuritySettingsOperations;
  /** The operation groups for extensions */
  public readonly extensions: ExtensionsOperations;
  /** The operation groups for edgeDevices */
  public readonly edgeDevices: EdgeDevicesOperations;
  /** The operation groups for edgeDeviceJobs */
  public readonly edgeDeviceJobs: EdgeDeviceJobsOperations;
  /** The operation groups for deploymentSettings */
  public readonly deploymentSettings: DeploymentSettingsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for offers */
  public readonly offers: OffersOperations;
  /** The operation groups for arcSettings */
  public readonly arcSettings: ArcSettingsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
