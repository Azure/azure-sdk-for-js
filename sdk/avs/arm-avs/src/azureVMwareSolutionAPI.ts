// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAzureVMwareSolutionAPI,
  AzureVMwareSolutionAPIContext,
  AzureVMwareSolutionAPIOptionalParams,
} from "./api/index.js";
import {
  PureStoragePoliciesOperations,
  _getPureStoragePoliciesOperations,
} from "./classic/pureStoragePolicies/index.js";
import { SkusOperations, _getSkusOperations } from "./classic/skus/index.js";
import {
  ProvisionedNetworksOperations,
  _getProvisionedNetworksOperations,
} from "./classic/provisionedNetworks/index.js";
import { HostsOperations, _getHostsOperations } from "./classic/hosts/index.js";
import { IscsiPathsOperations, _getIscsiPathsOperations } from "./classic/iscsiPaths/index.js";
import {
  ScriptExecutionsOperations,
  _getScriptExecutionsOperations,
} from "./classic/scriptExecutions/index.js";
import {
  ScriptCmdletsOperations,
  _getScriptCmdletsOperations,
} from "./classic/scriptCmdlets/index.js";
import {
  ScriptPackagesOperations,
  _getScriptPackagesOperations,
} from "./classic/scriptPackages/index.js";
import {
  PlacementPoliciesOperations,
  _getPlacementPoliciesOperations,
} from "./classic/placementPolicies/index.js";
import {
  VirtualMachinesOperations,
  _getVirtualMachinesOperations,
} from "./classic/virtualMachines/index.js";
import { AddonsOperations, _getAddonsOperations } from "./classic/addons/index.js";
import { CloudLinksOperations, _getCloudLinksOperations } from "./classic/cloudLinks/index.js";
import {
  GlobalReachConnectionsOperations,
  _getGlobalReachConnectionsOperations,
} from "./classic/globalReachConnections/index.js";
import {
  AuthorizationsOperations,
  _getAuthorizationsOperations,
} from "./classic/authorizations/index.js";
import {
  HcxEnterpriseSitesOperations,
  _getHcxEnterpriseSitesOperations,
} from "./classic/hcxEnterpriseSites/index.js";
import { DatastoresOperations, _getDatastoresOperations } from "./classic/datastores/index.js";
import { ClustersOperations, _getClustersOperations } from "./classic/clusters/index.js";
import {
  PrivateCloudsOperations,
  _getPrivateCloudsOperations,
} from "./classic/privateClouds/index.js";
import { LocationsOperations, _getLocationsOperations } from "./classic/locations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  WorkloadNetworksOperations,
  _getWorkloadNetworksOperations,
} from "./classic/workloadNetworks/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AzureVMwareSolutionAPIOptionalParams } from "./api/azureVMwareSolutionAPIContext.js";

export class AzureVMwareSolutionAPI {
  private _client: AzureVMwareSolutionAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureVMwareSolutionAPIOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureVMwareSolutionAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.pureStoragePolicies = _getPureStoragePoliciesOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.provisionedNetworks = _getProvisionedNetworksOperations(this._client);
    this.hosts = _getHostsOperations(this._client);
    this.iscsiPaths = _getIscsiPathsOperations(this._client);
    this.scriptExecutions = _getScriptExecutionsOperations(this._client);
    this.scriptCmdlets = _getScriptCmdletsOperations(this._client);
    this.scriptPackages = _getScriptPackagesOperations(this._client);
    this.placementPolicies = _getPlacementPoliciesOperations(this._client);
    this.virtualMachines = _getVirtualMachinesOperations(this._client);
    this.addons = _getAddonsOperations(this._client);
    this.cloudLinks = _getCloudLinksOperations(this._client);
    this.globalReachConnections = _getGlobalReachConnectionsOperations(this._client);
    this.authorizations = _getAuthorizationsOperations(this._client);
    this.hcxEnterpriseSites = _getHcxEnterpriseSitesOperations(this._client);
    this.datastores = _getDatastoresOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.privateClouds = _getPrivateCloudsOperations(this._client);
    this.locations = _getLocationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.workloadNetworks = _getWorkloadNetworksOperations(this._client);
  }

  /** The operation groups for pureStoragePolicies */
  public readonly pureStoragePolicies: PureStoragePoliciesOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for provisionedNetworks */
  public readonly provisionedNetworks: ProvisionedNetworksOperations;
  /** The operation groups for hosts */
  public readonly hosts: HostsOperations;
  /** The operation groups for iscsiPaths */
  public readonly iscsiPaths: IscsiPathsOperations;
  /** The operation groups for scriptExecutions */
  public readonly scriptExecutions: ScriptExecutionsOperations;
  /** The operation groups for scriptCmdlets */
  public readonly scriptCmdlets: ScriptCmdletsOperations;
  /** The operation groups for scriptPackages */
  public readonly scriptPackages: ScriptPackagesOperations;
  /** The operation groups for placementPolicies */
  public readonly placementPolicies: PlacementPoliciesOperations;
  /** The operation groups for virtualMachines */
  public readonly virtualMachines: VirtualMachinesOperations;
  /** The operation groups for addons */
  public readonly addons: AddonsOperations;
  /** The operation groups for cloudLinks */
  public readonly cloudLinks: CloudLinksOperations;
  /** The operation groups for globalReachConnections */
  public readonly globalReachConnections: GlobalReachConnectionsOperations;
  /** The operation groups for authorizations */
  public readonly authorizations: AuthorizationsOperations;
  /** The operation groups for hcxEnterpriseSites */
  public readonly hcxEnterpriseSites: HcxEnterpriseSitesOperations;
  /** The operation groups for datastores */
  public readonly datastores: DatastoresOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for privateClouds */
  public readonly privateClouds: PrivateCloudsOperations;
  /** The operation groups for locations */
  public readonly locations: LocationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for workloadNetworks */
  public readonly workloadNetworks: WorkloadNetworksOperations;
}
