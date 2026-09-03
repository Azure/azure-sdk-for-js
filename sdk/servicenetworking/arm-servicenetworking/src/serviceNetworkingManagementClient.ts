// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceNetworkingManagementContext,
  ServiceNetworkingManagementClientOptionalParams,
} from "./api/index.js";
import { createServiceNetworkingManagement } from "./api/index.js";
import type { AssociationsInterfaceOperations } from "./classic/associationsInterface/index.js";
import { _getAssociationsInterfaceOperations } from "./classic/associationsInterface/index.js";
import type { FrontendsInterfaceOperations } from "./classic/frontendsInterface/index.js";
import { _getFrontendsInterfaceOperations } from "./classic/frontendsInterface/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsInterfaceOperations } from "./classic/privateEndpointConnectionsInterface/index.js";
import { _getPrivateEndpointConnectionsInterfaceOperations } from "./classic/privateEndpointConnectionsInterface/index.js";
import type { PrivateLinkResourcesInterfaceOperations } from "./classic/privateLinkResourcesInterface/index.js";
import { _getPrivateLinkResourcesInterfaceOperations } from "./classic/privateLinkResourcesInterface/index.js";
import type { SecurityPoliciesInterfaceOperations } from "./classic/securityPoliciesInterface/index.js";
import { _getSecurityPoliciesInterfaceOperations } from "./classic/securityPoliciesInterface/index.js";
import type { TrafficControllerInterfaceOperations } from "./classic/trafficControllerInterface/index.js";
import { _getTrafficControllerInterfaceOperations } from "./classic/trafficControllerInterface/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ServiceNetworkingManagementClientOptionalParams } from "./api/serviceNetworkingManagementContext.js";

export class ServiceNetworkingManagementClient {
  private _client: ServiceNetworkingManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Traffic Controller Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ServiceNetworkingManagementClientOptionalParams = {},
  ) {
    this._client = createServiceNetworkingManagement(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.privateLinkResourcesInterface = _getPrivateLinkResourcesInterfaceOperations(this._client);
    this.privateEndpointConnectionsInterface = _getPrivateEndpointConnectionsInterfaceOperations(
      this._client,
    );
    this.trafficControllerInterface = _getTrafficControllerInterfaceOperations(this._client);
    this.securityPoliciesInterface = _getSecurityPoliciesInterfaceOperations(this._client);
    this.frontendsInterface = _getFrontendsInterfaceOperations(this._client);
    this.associationsInterface = _getAssociationsInterfaceOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for privateLinkResourcesInterface */
  public readonly privateLinkResourcesInterface: PrivateLinkResourcesInterfaceOperations;
  /** The operation groups for privateEndpointConnectionsInterface */
  public readonly privateEndpointConnectionsInterface: PrivateEndpointConnectionsInterfaceOperations;
  /** The operation groups for trafficControllerInterface */
  public readonly trafficControllerInterface: TrafficControllerInterfaceOperations;
  /** The operation groups for securityPoliciesInterface */
  public readonly securityPoliciesInterface: SecurityPoliciesInterfaceOperations;
  /** The operation groups for frontendsInterface */
  public readonly frontendsInterface: FrontendsInterfaceOperations;
  /** The operation groups for associationsInterface */
  public readonly associationsInterface: AssociationsInterfaceOperations;
}
