// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext, HorizonDbClientOptionalParams } from "./api/index.js";
import { createHorizonDb } from "./api/index.js";
import type { AuthenticationsOperations } from "./classic/authentications/index.js";
import { _getAuthenticationsOperations } from "./classic/authentications/index.js";
import type { CapabilitiesOperations } from "./classic/capabilities/index.js";
import { _getCapabilitiesOperations } from "./classic/capabilities/index.js";
import type { ChangeDataCaptureCapabilitiesOperations } from "./classic/changeDataCaptureCapabilities/index.js";
import { _getChangeDataCaptureCapabilitiesOperations } from "./classic/changeDataCaptureCapabilities/index.js";
import type { ChangeDataCaptureConfigurationsOperations } from "./classic/changeDataCaptureConfigurations/index.js";
import { _getChangeDataCaptureConfigurationsOperations } from "./classic/changeDataCaptureConfigurations/index.js";
import type { ChangeDataCaptureDestinationsOperations } from "./classic/changeDataCaptureDestinations/index.js";
import { _getChangeDataCaptureDestinationsOperations } from "./classic/changeDataCaptureDestinations/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { DefaultParameterGroupsOperations } from "./classic/defaultParameterGroups/index.js";
import { _getDefaultParameterGroupsOperations } from "./classic/defaultParameterGroups/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { FirewallRulesOperations } from "./classic/firewallRules/index.js";
import { _getFirewallRulesOperations } from "./classic/firewallRules/index.js";
import type { IdentityAssignmentsOperations } from "./classic/identityAssignments/index.js";
import { _getIdentityAssignmentsOperations } from "./classic/identityAssignments/index.js";
import type { LogCaptureConfigurationsOperations } from "./classic/logCaptureConfigurations/index.js";
import { _getLogCaptureConfigurationsOperations } from "./classic/logCaptureConfigurations/index.js";
import type { LogFilesOperations } from "./classic/logFiles/index.js";
import { _getLogFilesOperations } from "./classic/logFiles/index.js";
import type { MaintenanceEventsOperations } from "./classic/maintenanceEvents/index.js";
import { _getMaintenanceEventsOperations } from "./classic/maintenanceEvents/index.js";
import type { MicrosoftEntraAdministratorsOperations } from "./classic/microsoftEntraAdministrators/index.js";
import { _getMicrosoftEntraAdministratorsOperations } from "./classic/microsoftEntraAdministrators/index.js";
import type { MicrosoftEntraAuthenticationsOperations } from "./classic/microsoftEntraAuthentications/index.js";
import { _getMicrosoftEntraAuthenticationsOperations } from "./classic/microsoftEntraAuthentications/index.js";
import type { NodesOperations } from "./classic/nodes/index.js";
import { _getNodesOperations } from "./classic/nodes/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ParameterGroupsOperations } from "./classic/parameterGroups/index.js";
import { _getParameterGroupsOperations } from "./classic/parameterGroups/index.js";
import type { PasswordAuthenticationsOperations } from "./classic/passwordAuthentications/index.js";
import { _getPasswordAuthenticationsOperations } from "./classic/passwordAuthentications/index.js";
import type { PoolsOperations } from "./classic/pools/index.js";
import { _getPoolsOperations } from "./classic/pools/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { HorizonDbClientOptionalParams } from "./api/horizonDbContext.js";

export class HorizonDbClient {
  private _client: HorizonDbContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Resource Provider API for managing HorizonDB clusters, pools, endpoints, nodes, and firewall rules */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HorizonDbClientOptionalParams = {},
  ) {
    this._client = createHorizonDb(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.logFiles = _getLogFilesOperations(this._client);
    this.logCaptureConfigurations = _getLogCaptureConfigurationsOperations(this._client);
    this.nodes = _getNodesOperations(this._client);
    this.maintenanceEvents = _getMaintenanceEventsOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.changeDataCaptureConfigurations = _getChangeDataCaptureConfigurationsOperations(
      this._client,
    );
    this.identityAssignments = _getIdentityAssignmentsOperations(this._client);
    this.changeDataCaptureDestinations = _getChangeDataCaptureDestinationsOperations(this._client);
    this.changeDataCaptureCapabilities = _getChangeDataCaptureCapabilitiesOperations(this._client);
    this.microsoftEntraAuthentications = _getMicrosoftEntraAuthenticationsOperations(this._client);
    this.passwordAuthentications = _getPasswordAuthenticationsOperations(this._client);
    this.authentications = _getAuthenticationsOperations(this._client);
    this.microsoftEntraAdministrators = _getMicrosoftEntraAdministratorsOperations(this._client);
    this.defaultParameterGroups = _getDefaultParameterGroupsOperations(this._client);
    this.parameterGroups = _getParameterGroupsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.pools = _getPoolsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.capabilities = _getCapabilitiesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for logFiles */
  public readonly logFiles: LogFilesOperations;
  /** The operation groups for logCaptureConfigurations */
  public readonly logCaptureConfigurations: LogCaptureConfigurationsOperations;
  /** The operation groups for nodes */
  public readonly nodes: NodesOperations;
  /** The operation groups for maintenanceEvents */
  public readonly maintenanceEvents: MaintenanceEventsOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for changeDataCaptureConfigurations */
  public readonly changeDataCaptureConfigurations: ChangeDataCaptureConfigurationsOperations;
  /** The operation groups for identityAssignments */
  public readonly identityAssignments: IdentityAssignmentsOperations;
  /** The operation groups for changeDataCaptureDestinations */
  public readonly changeDataCaptureDestinations: ChangeDataCaptureDestinationsOperations;
  /** The operation groups for changeDataCaptureCapabilities */
  public readonly changeDataCaptureCapabilities: ChangeDataCaptureCapabilitiesOperations;
  /** The operation groups for microsoftEntraAuthentications */
  public readonly microsoftEntraAuthentications: MicrosoftEntraAuthenticationsOperations;
  /** The operation groups for passwordAuthentications */
  public readonly passwordAuthentications: PasswordAuthenticationsOperations;
  /** The operation groups for authentications */
  public readonly authentications: AuthenticationsOperations;
  /** The operation groups for microsoftEntraAdministrators */
  public readonly microsoftEntraAdministrators: MicrosoftEntraAdministratorsOperations;
  /** The operation groups for defaultParameterGroups */
  public readonly defaultParameterGroups: DefaultParameterGroupsOperations;
  /** The operation groups for parameterGroups */
  public readonly parameterGroups: ParameterGroupsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for pools */
  public readonly pools: PoolsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
