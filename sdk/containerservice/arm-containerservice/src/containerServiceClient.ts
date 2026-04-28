// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext, ContainerServiceClientOptionalParams } from "./api/index.js";
import { createContainerService } from "./api/index.js";
import type { AgentPoolsOperations } from "./classic/agentPools/index.js";
import { _getAgentPoolsOperations } from "./classic/agentPools/index.js";
import type { MachinesOperations } from "./classic/machines/index.js";
import { _getMachinesOperations } from "./classic/machines/index.js";
import type { MaintenanceConfigurationsOperations } from "./classic/maintenanceConfigurations/index.js";
import { _getMaintenanceConfigurationsOperations } from "./classic/maintenanceConfigurations/index.js";
import type { ManagedClustersOperations } from "./classic/managedClusters/index.js";
import { _getManagedClustersOperations } from "./classic/managedClusters/index.js";
import type { ManagedNamespacesOperations } from "./classic/managedNamespaces/index.js";
import { _getManagedNamespacesOperations } from "./classic/managedNamespaces/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ResolvePrivateLinkServiceIdOperations } from "./classic/resolvePrivateLinkServiceId/index.js";
import { _getResolvePrivateLinkServiceIdOperations } from "./classic/resolvePrivateLinkServiceId/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { TrustedAccessRoleBindingsOperations } from "./classic/trustedAccessRoleBindings/index.js";
import { _getTrustedAccessRoleBindingsOperations } from "./classic/trustedAccessRoleBindings/index.js";
import type { TrustedAccessRolesOperations } from "./classic/trustedAccessRoles/index.js";
import { _getTrustedAccessRolesOperations } from "./classic/trustedAccessRoles/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerServiceClientOptionalParams } from "./api/containerServiceContext.js";

export class ContainerServiceClient {
  private _client: ContainerServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ContainerServiceClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ContainerServiceClientOptionalParams,
  );
  /** The Container Service Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ContainerServiceClientOptionalParams,
    options?: ContainerServiceClientOptionalParams,
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
    this._client = createContainerService(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.trustedAccessRoles = _getTrustedAccessRolesOperations(this._client);
    this.resolvePrivateLinkServiceId = _getResolvePrivateLinkServiceIdOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.trustedAccessRoleBindings = _getTrustedAccessRoleBindingsOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.machines = _getMachinesOperations(this._client);
    this.managedNamespaces = _getManagedNamespacesOperations(this._client);
    this.maintenanceConfigurations = _getMaintenanceConfigurationsOperations(this._client);
    this.managedClusters = _getManagedClustersOperations(this._client);
    this.agentPools = _getAgentPoolsOperations(this._client);
  }

  /** The operation groups for trustedAccessRoles */
  public readonly trustedAccessRoles: TrustedAccessRolesOperations;
  /** The operation groups for resolvePrivateLinkServiceId */
  public readonly resolvePrivateLinkServiceId: ResolvePrivateLinkServiceIdOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for trustedAccessRoleBindings */
  public readonly trustedAccessRoleBindings: TrustedAccessRoleBindingsOperations;
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for machines */
  public readonly machines: MachinesOperations;
  /** The operation groups for managedNamespaces */
  public readonly managedNamespaces: ManagedNamespacesOperations;
  /** The operation groups for maintenanceConfigurations */
  public readonly maintenanceConfigurations: MaintenanceConfigurationsOperations;
  /** The operation groups for managedClusters */
  public readonly managedClusters: ManagedClustersOperations;
  /** The operation groups for agentPools */
  public readonly agentPools: AgentPoolsOperations;
}
