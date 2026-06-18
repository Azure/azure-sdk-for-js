// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContainerServiceContext,
  ContainerServiceClientOptionalParams,
  createContainerService,
} from "./api/index.js";
import { AgentPoolsOperations, _getAgentPoolsOperations } from "./classic/agentPools/index.js";
import {
  ContainerServiceOperations,
  _getContainerServiceOperations,
} from "./classic/containerService/index.js";
import {
  IdentityBindingsOperations,
  _getIdentityBindingsOperations,
} from "./classic/identityBindings/index.js";
import {
  JWTAuthenticatorsOperations,
  _getJWTAuthenticatorsOperations,
} from "./classic/jwtAuthenticators/index.js";
import {
  LoadBalancersOperations,
  _getLoadBalancersOperations,
} from "./classic/loadBalancers/index.js";
import { MachinesOperations, _getMachinesOperations } from "./classic/machines/index.js";
import {
  MaintenanceConfigurationsOperations,
  _getMaintenanceConfigurationsOperations,
} from "./classic/maintenanceConfigurations/index.js";
import {
  ManagedClusterSnapshotsOperations,
  _getManagedClusterSnapshotsOperations,
} from "./classic/managedClusterSnapshots/index.js";
import {
  ManagedClustersOperations,
  _getManagedClustersOperations,
} from "./classic/managedClusters/index.js";
import {
  ManagedNamespacesOperations,
  _getManagedNamespacesOperations,
} from "./classic/managedNamespaces/index.js";
import {
  MeshMembershipsOperations,
  _getMeshMembershipsOperations,
} from "./classic/meshMemberships/index.js";
import {
  OperationStatusResultOperations,
  _getOperationStatusResultOperations,
} from "./classic/operationStatusResult/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  ResolvePrivateLinkServiceIdOperations,
  _getResolvePrivateLinkServiceIdOperations,
} from "./classic/resolvePrivateLinkServiceId/index.js";
import { SnapshotsOperations, _getSnapshotsOperations } from "./classic/snapshots/index.js";
import {
  TrustedAccessRoleBindingsOperations,
  _getTrustedAccessRoleBindingsOperations,
} from "./classic/trustedAccessRoleBindings/index.js";
import {
  TrustedAccessRolesOperations,
  _getTrustedAccessRolesOperations,
} from "./classic/trustedAccessRoles/index.js";
import { VmSkusOperations, _getVmSkusOperations } from "./classic/vmSkus/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    this.vmSkus = _getVmSkusOperations(this._client);
    this.containerService = _getContainerServiceOperations(this._client);
    this.trustedAccessRoles = _getTrustedAccessRolesOperations(this._client);
    this.resolvePrivateLinkServiceId = _getResolvePrivateLinkServiceIdOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.operationStatusResult = _getOperationStatusResultOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.meshMemberships = _getMeshMembershipsOperations(this._client);
    this.jwtAuthenticators = _getJWTAuthenticatorsOperations(this._client);
    this.identityBindings = _getIdentityBindingsOperations(this._client);
    this.loadBalancers = _getLoadBalancersOperations(this._client);
    this.trustedAccessRoleBindings = _getTrustedAccessRoleBindingsOperations(this._client);
    this.managedClusterSnapshots = _getManagedClusterSnapshotsOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.machines = _getMachinesOperations(this._client);
    this.managedNamespaces = _getManagedNamespacesOperations(this._client);
    this.maintenanceConfigurations = _getMaintenanceConfigurationsOperations(this._client);
    this.managedClusters = _getManagedClustersOperations(this._client);
    this.agentPools = _getAgentPoolsOperations(this._client);
  }

  /** The operation groups for vmSkus */
  public readonly vmSkus: VmSkusOperations;
  /** The operation groups for containerService */
  public readonly containerService: ContainerServiceOperations;
  /** The operation groups for trustedAccessRoles */
  public readonly trustedAccessRoles: TrustedAccessRolesOperations;
  /** The operation groups for resolvePrivateLinkServiceId */
  public readonly resolvePrivateLinkServiceId: ResolvePrivateLinkServiceIdOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for operationStatusResult */
  public readonly operationStatusResult: OperationStatusResultOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for meshMemberships */
  public readonly meshMemberships: MeshMembershipsOperations;
  /** The operation groups for jwtAuthenticators */
  public readonly jwtAuthenticators: JWTAuthenticatorsOperations;
  /** The operation groups for identityBindings */
  public readonly identityBindings: IdentityBindingsOperations;
  /** The operation groups for loadBalancers */
  public readonly loadBalancers: LoadBalancersOperations;
  /** The operation groups for trustedAccessRoleBindings */
  public readonly trustedAccessRoleBindings: TrustedAccessRoleBindingsOperations;
  /** The operation groups for managedClusterSnapshots */
  public readonly managedClusterSnapshots: ManagedClusterSnapshotsOperations;
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
