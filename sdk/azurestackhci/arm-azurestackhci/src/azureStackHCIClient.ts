// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext, AzureStackHCIClientOptionalParams } from "./api/index.js";
import { createAzureStackHCI } from "./api/index.js";
import type { ArcSettingsOperations } from "./classic/arcSettings/index.js";
import { _getArcSettingsOperations } from "./classic/arcSettings/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { DeploymentSettingsOperations } from "./classic/deploymentSettings/index.js";
import { _getDeploymentSettingsOperations } from "./classic/deploymentSettings/index.js";
import type { EdgeDeviceJobsOperations } from "./classic/edgeDeviceJobs/index.js";
import { _getEdgeDeviceJobsOperations } from "./classic/edgeDeviceJobs/index.js";
import type { EdgeDevicesOperations } from "./classic/edgeDevices/index.js";
import { _getEdgeDevicesOperations } from "./classic/edgeDevices/index.js";
import type { EdgeMachineJobsOperations } from "./classic/edgeMachineJobs/index.js";
import { _getEdgeMachineJobsOperations } from "./classic/edgeMachineJobs/index.js";
import type { EdgeMachinesOperations } from "./classic/edgeMachines/index.js";
import { _getEdgeMachinesOperations } from "./classic/edgeMachines/index.js";
import type { ExtensionsOperations } from "./classic/extensions/index.js";
import { _getExtensionsOperations } from "./classic/extensions/index.js";
import type { KubernetesVersionsOperations } from "./classic/kubernetesVersions/index.js";
import { _getKubernetesVersionsOperations } from "./classic/kubernetesVersions/index.js";
import type { OffersOperations } from "./classic/offers/index.js";
import { _getOffersOperations } from "./classic/offers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OsImagesOperations } from "./classic/osImages/index.js";
import { _getOsImagesOperations } from "./classic/osImages/index.js";
import type { OwnershipVouchersOperations } from "./classic/ownershipVouchers/index.js";
import { _getOwnershipVouchersOperations } from "./classic/ownershipVouchers/index.js";
import type { PlatformUpdatesOperations } from "./classic/platformUpdates/index.js";
import { _getPlatformUpdatesOperations } from "./classic/platformUpdates/index.js";
import type { PublishersOperations } from "./classic/publishers/index.js";
import { _getPublishersOperations } from "./classic/publishers/index.js";
import type { SecuritySettingsOperations } from "./classic/securitySettings/index.js";
import { _getSecuritySettingsOperations } from "./classic/securitySettings/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { UpdateContentsOperations } from "./classic/updateContents/index.js";
import { _getUpdateContentsOperations } from "./classic/updateContents/index.js";
import type { UpdateRunsOperations } from "./classic/updateRuns/index.js";
import { _getUpdateRunsOperations } from "./classic/updateRuns/index.js";
import type { UpdateSummariesOperations } from "./classic/updateSummaries/index.js";
import { _getUpdateSummariesOperations } from "./classic/updateSummaries/index.js";
import type { UpdatesOperations } from "./classic/updates/index.js";
import { _getUpdatesOperations } from "./classic/updates/index.js";
import type { ValidatedSolutionRecipesOperations } from "./classic/validatedSolutionRecipes/index.js";
import { _getValidatedSolutionRecipesOperations } from "./classic/validatedSolutionRecipes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { AzureStackHCIClientOptionalParams } from "./api/azureStackHCIContext.js";

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
    this.ownershipVouchers = _getOwnershipVouchersOperations(this._client);
    this.edgeMachineJobs = _getEdgeMachineJobsOperations(this._client);
    this.edgeMachines = _getEdgeMachinesOperations(this._client);
    this.validatedSolutionRecipes = _getValidatedSolutionRecipesOperations(this._client);
    this.updates = _getUpdatesOperations(this._client);
    this.updateRuns = _getUpdateRunsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.securitySettings = _getSecuritySettingsOperations(this._client);
    this.publishers = _getPublishersOperations(this._client);
    this.extensions = _getExtensionsOperations(this._client);
    this.edgeDevices = _getEdgeDevicesOperations(this._client);
    this.edgeDeviceJobs = _getEdgeDeviceJobsOperations(this._client);
    this.deploymentSettings = _getDeploymentSettingsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.offers = _getOffersOperations(this._client);
    this.arcSettings = _getArcSettingsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.updateContents = _getUpdateContentsOperations(this._client);
    this.osImages = _getOsImagesOperations(this._client);
    this.platformUpdates = _getPlatformUpdatesOperations(this._client);
    this.kubernetesVersions = _getKubernetesVersionsOperations(this._client);
  }

  /** The operation groups for updateSummaries */
  public readonly updateSummaries: UpdateSummariesOperations;
  /** The operation groups for ownershipVouchers */
  public readonly ownershipVouchers: OwnershipVouchersOperations;
  /** The operation groups for edgeMachineJobs */
  public readonly edgeMachineJobs: EdgeMachineJobsOperations;
  /** The operation groups for edgeMachines */
  public readonly edgeMachines: EdgeMachinesOperations;
  /** The operation groups for validatedSolutionRecipes */
  public readonly validatedSolutionRecipes: ValidatedSolutionRecipesOperations;
  /** The operation groups for updates */
  public readonly updates: UpdatesOperations;
  /** The operation groups for updateRuns */
  public readonly updateRuns: UpdateRunsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for securitySettings */
  public readonly securitySettings: SecuritySettingsOperations;
  /** The operation groups for publishers */
  public readonly publishers: PublishersOperations;
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
  /** The operation groups for updateContents */
  public readonly updateContents: UpdateContentsOperations;
  /** The operation groups for osImages */
  public readonly osImages: OsImagesOperations;
  /** The operation groups for platformUpdates */
  public readonly platformUpdates: PlatformUpdatesOperations;
  /** The operation groups for kubernetesVersions */
  public readonly kubernetesVersions: KubernetesVersionsOperations;
}
