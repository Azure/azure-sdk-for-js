// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext, AzureStackHCIClientOptionalParams } from "./api/index.js";
import { createAzureStackHCI } from "./api/index.js";
import type { ArcSettingsOperations } from "./classic/arcSettings/index.js";
import { _getArcSettingsOperations } from "./classic/arcSettings/index.js";
import type { ClusterJobsOperations } from "./classic/clusterJobs/index.js";
import { _getClusterJobsOperations } from "./classic/clusterJobs/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { DeploymentSettingsOperations } from "./classic/deploymentSettings/index.js";
import { _getDeploymentSettingsOperations } from "./classic/deploymentSettings/index.js";
import type { EdgeDeviceJobsOperations } from "./classic/edgeDeviceJobs/index.js";
import { _getEdgeDeviceJobsOperations } from "./classic/edgeDeviceJobs/index.js";
import type { EdgeDevicesOperations } from "./classic/edgeDevices/index.js";
import { _getEdgeDevicesOperations } from "./classic/edgeDevices/index.js";
import type { EdgeMachineDeploymentSettingsOperations } from "./classic/edgeMachineDeploymentSettings/index.js";
import { _getEdgeMachineDeploymentSettingsOperations } from "./classic/edgeMachineDeploymentSettings/index.js";
import type { EdgeMachineDiskJobsOperations } from "./classic/edgeMachineDiskJobs/index.js";
import { _getEdgeMachineDiskJobsOperations } from "./classic/edgeMachineDiskJobs/index.js";
import type { EdgeMachineDiskPrivilegedJobsOperations } from "./classic/edgeMachineDiskPrivilegedJobs/index.js";
import { _getEdgeMachineDiskPrivilegedJobsOperations } from "./classic/edgeMachineDiskPrivilegedJobs/index.js";
import type { EdgeMachineDisksOperations } from "./classic/edgeMachineDisks/index.js";
import { _getEdgeMachineDisksOperations } from "./classic/edgeMachineDisks/index.js";
import type { EdgeMachineJobsOperations } from "./classic/edgeMachineJobs/index.js";
import { _getEdgeMachineJobsOperations } from "./classic/edgeMachineJobs/index.js";
import type { EdgeMachineNetworkAdapterJobsOperations } from "./classic/edgeMachineNetworkAdapterJobs/index.js";
import { _getEdgeMachineNetworkAdapterJobsOperations } from "./classic/edgeMachineNetworkAdapterJobs/index.js";
import type { EdgeMachineNetworkAdaptersOperations } from "./classic/edgeMachineNetworkAdapters/index.js";
import { _getEdgeMachineNetworkAdaptersOperations } from "./classic/edgeMachineNetworkAdapters/index.js";
import type { EdgeMachineSecuritySettingsOperationsOperations } from "./classic/edgeMachineSecuritySettingsOperations/index.js";
import { _getEdgeMachineSecuritySettingsOperationsOperations } from "./classic/edgeMachineSecuritySettingsOperations/index.js";
import type { EdgeMachineVolumesOperations } from "./classic/edgeMachineVolumes/index.js";
import { _getEdgeMachineVolumesOperations } from "./classic/edgeMachineVolumes/index.js";
import type { EdgeMachinesOperations } from "./classic/edgeMachines/index.js";
import { _getEdgeMachinesOperations } from "./classic/edgeMachines/index.js";
import type { ExtensionsOperations } from "./classic/extensions/index.js";
import { _getExtensionsOperations } from "./classic/extensions/index.js";
import type { OffersOperations } from "./classic/offers/index.js";
import { _getOffersOperations } from "./classic/offers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OsImagesOperations } from "./classic/osImages/index.js";
import { _getOsImagesOperations } from "./classic/osImages/index.js";
import type { OwnershipVouchersOperations } from "./classic/ownershipVouchers/index.js";
import { _getOwnershipVouchersOperations } from "./classic/ownershipVouchers/index.js";
import type { SecuritySettingsOperations } from "./classic/securitySettings/index.js";
import { _getSecuritySettingsOperations } from "./classic/securitySettings/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { UpdateRunsOperations } from "./classic/updateRuns/index.js";
import { _getUpdateRunsOperations } from "./classic/updateRuns/index.js";
import type { UpdateSummariesOperations } from "./classic/updateSummaries/index.js";
import { _getUpdateSummariesOperations } from "./classic/updateSummaries/index.js";
import type { UpdateSummariesOperationGroupOperations } from "./classic/updateSummariesOperationGroup/index.js";
import { _getUpdateSummariesOperationGroupOperations } from "./classic/updateSummariesOperationGroup/index.js";
import type { UpdatesOperations } from "./classic/updates/index.js";
import { _getUpdatesOperations } from "./classic/updates/index.js";
import type { ValidatedSolutionRecipesOperations } from "./classic/validatedSolutionRecipes/index.js";
import { _getValidatedSolutionRecipesOperations } from "./classic/validatedSolutionRecipes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this._client = createAzureStackHCI(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.updateSummaries = _getUpdateSummariesOperations(this._client);
    this.edgeMachineDeploymentSettings = _getEdgeMachineDeploymentSettingsOperations(this._client);
    this.edgeMachineSecuritySettingsOperations =
      _getEdgeMachineSecuritySettingsOperationsOperations(this._client);
    this.edgeMachineDiskPrivilegedJobs = _getEdgeMachineDiskPrivilegedJobsOperations(this._client);
    this.edgeMachineDiskJobs = _getEdgeMachineDiskJobsOperations(this._client);
    this.edgeMachineVolumes = _getEdgeMachineVolumesOperations(this._client);
    this.edgeMachineDisks = _getEdgeMachineDisksOperations(this._client);
    this.edgeMachineNetworkAdapterJobs = _getEdgeMachineNetworkAdapterJobsOperations(this._client);
    this.edgeMachineNetworkAdapters = _getEdgeMachineNetworkAdaptersOperations(this._client);
    this.clusterJobs = _getClusterJobsOperations(this._client);
    this.ownershipVouchers = _getOwnershipVouchersOperations(this._client);
    this.edgeMachineJobs = _getEdgeMachineJobsOperations(this._client);
    this.edgeMachines = _getEdgeMachinesOperations(this._client);
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
    this.osImages = _getOsImagesOperations(this._client);
  }

  /** The operation groups for updateSummaries */
  public readonly updateSummaries: UpdateSummariesOperations;
  /** The operation groups for edgeMachineDeploymentSettings */
  public readonly edgeMachineDeploymentSettings: EdgeMachineDeploymentSettingsOperations;
  /** The operation groups for edgeMachineSecuritySettingsOperations */
  public readonly edgeMachineSecuritySettingsOperations: EdgeMachineSecuritySettingsOperationsOperations;
  /** The operation groups for edgeMachineDiskPrivilegedJobs */
  public readonly edgeMachineDiskPrivilegedJobs: EdgeMachineDiskPrivilegedJobsOperations;
  /** The operation groups for edgeMachineDiskJobs */
  public readonly edgeMachineDiskJobs: EdgeMachineDiskJobsOperations;
  /** The operation groups for edgeMachineVolumes */
  public readonly edgeMachineVolumes: EdgeMachineVolumesOperations;
  /** The operation groups for edgeMachineDisks */
  public readonly edgeMachineDisks: EdgeMachineDisksOperations;
  /** The operation groups for edgeMachineNetworkAdapterJobs */
  public readonly edgeMachineNetworkAdapterJobs: EdgeMachineNetworkAdapterJobsOperations;
  /** The operation groups for edgeMachineNetworkAdapters */
  public readonly edgeMachineNetworkAdapters: EdgeMachineNetworkAdaptersOperations;
  /** The operation groups for clusterJobs */
  public readonly clusterJobs: ClusterJobsOperations;
  /** The operation groups for ownershipVouchers */
  public readonly ownershipVouchers: OwnershipVouchersOperations;
  /** The operation groups for edgeMachineJobs */
  public readonly edgeMachineJobs: EdgeMachineJobsOperations;
  /** The operation groups for edgeMachines */
  public readonly edgeMachines: EdgeMachinesOperations;
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
  /** The operation groups for osImages */
  public readonly osImages: OsImagesOperations;
}
