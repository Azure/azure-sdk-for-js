// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DashboardManagementContext,
  DashboardManagementClientOptionalParams,
} from "./api/index.js";
import { createDashboardManagement } from "./api/index.js";
import type { GrafanaOperations } from "./classic/grafana/index.js";
import { _getGrafanaOperations } from "./classic/grafana/index.js";
import type { IntegrationFabricsOperations } from "./classic/integrationFabrics/index.js";
import { _getIntegrationFabricsOperations } from "./classic/integrationFabrics/index.js";
import type { ManagedDashboardsOperations } from "./classic/managedDashboards/index.js";
import { _getManagedDashboardsOperations } from "./classic/managedDashboards/index.js";
import type { ManagedPrivateEndpointsOperations } from "./classic/managedPrivateEndpoints/index.js";
import { _getManagedPrivateEndpointsOperations } from "./classic/managedPrivateEndpoints/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DashboardManagementClientOptionalParams } from "./api/dashboardManagementContext.js";

export class DashboardManagementClient {
  private _client: DashboardManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft.Dashboard Rest API spec. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DashboardManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDashboardManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.managedPrivateEndpoints = _getManagedPrivateEndpointsOperations(this._client);
    this.grafana = _getGrafanaOperations(this._client);
    this.managedDashboards = _getManagedDashboardsOperations(this._client);
    this.integrationFabrics = _getIntegrationFabricsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for managedPrivateEndpoints */
  public readonly managedPrivateEndpoints: ManagedPrivateEndpointsOperations;
  /** The operation groups for grafana */
  public readonly grafana: GrafanaOperations;
  /** The operation groups for managedDashboards */
  public readonly managedDashboards: ManagedDashboardsOperations;
  /** The operation groups for integrationFabrics */
  public readonly integrationFabrics: IntegrationFabricsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
