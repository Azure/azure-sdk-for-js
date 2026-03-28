// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HDInsightManagementContext,
  HDInsightManagementClientOptionalParams,
} from "./api/index.js";
import { createHDInsightManagement } from "./api/index.js";
import type { ApplicationsOperations } from "./classic/applications/index.js";
import { _getApplicationsOperations } from "./classic/applications/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { ConfigurationsOperations } from "./classic/configurations/index.js";
import { _getConfigurationsOperations } from "./classic/configurations/index.js";
import type { ExtensionsOperations } from "./classic/extensions/index.js";
import { _getExtensionsOperations } from "./classic/extensions/index.js";
import type { LocationsOperations } from "./classic/locations/index.js";
import { _getLocationsOperations } from "./classic/locations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ScriptActionsOperations } from "./classic/scriptActions/index.js";
import { _getScriptActionsOperations } from "./classic/scriptActions/index.js";
import type { ScriptExecutionHistoryOperations } from "./classic/scriptExecutionHistory/index.js";
import { _getScriptExecutionHistoryOperations } from "./classic/scriptExecutionHistory/index.js";
import type { VirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import { _getVirtualMachinesOperations } from "./classic/virtualMachines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { HDInsightManagementClientOptionalParams } from "./api/hdInsightManagementContext.js";

export class HDInsightManagementClient {
  private _client: HDInsightManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HDInsightManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HDInsightManagementClientOptionalParams,
  );
  /** The HDInsight Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HDInsightManagementClientOptionalParams,
    options?: HDInsightManagementClientOptionalParams,
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
    this._client = createHDInsightManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.locations = _getLocationsOperations(this._client);
    this.virtualMachines = _getVirtualMachinesOperations(this._client);
    this.scriptExecutionHistory = _getScriptExecutionHistoryOperations(this._client);
    this.scriptActions = _getScriptActionsOperations(this._client);
    this.extensions = _getExtensionsOperations(this._client);
    this.configurations = _getConfigurationsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.applications = _getApplicationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for locations */
  public readonly locations: LocationsOperations;
  /** The operation groups for virtualMachines */
  public readonly virtualMachines: VirtualMachinesOperations;
  /** The operation groups for scriptExecutionHistory */
  public readonly scriptExecutionHistory: ScriptExecutionHistoryOperations;
  /** The operation groups for scriptActions */
  public readonly scriptActions: ScriptActionsOperations;
  /** The operation groups for extensions */
  public readonly extensions: ExtensionsOperations;
  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for applications */
  public readonly applications: ApplicationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
