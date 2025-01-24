// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  _getTrafficControllerInterfaceOperations,
  TrafficControllerInterfaceOperations,
} from "./classic/trafficControllerInterface/index.js";
import {
  _getSecurityPoliciesInterfaceOperations,
  SecurityPoliciesInterfaceOperations,
} from "./classic/securityPoliciesInterface/index.js";
import {
  _getFrontendsInterfaceOperations,
  FrontendsInterfaceOperations,
} from "./classic/frontendsInterface/index.js";
import {
  _getAssociationsInterfaceOperations,
  AssociationsInterfaceOperations,
} from "./classic/associationsInterface/index.js";
import {
  createServiceNetworkingManagement,
  ServiceNetworkingManagementContext,
  ServiceNetworkingManagementClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ServiceNetworkingManagementClientOptionalParams } from "./api/serviceNetworkingManagementContext.js";

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
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createServiceNetworkingManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = _getOperationsOperations(this._client);
    this.trafficControllerInterface = _getTrafficControllerInterfaceOperations(this._client);
    this.securityPoliciesInterface = _getSecurityPoliciesInterfaceOperations(this._client);
    this.frontendsInterface = _getFrontendsInterfaceOperations(this._client);
    this.associationsInterface = _getAssociationsInterfaceOperations(this._client);
  }

  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for trafficControllerInterface */
  public readonly trafficControllerInterface: TrafficControllerInterfaceOperations;
  /** The operation groups for securityPoliciesInterface */
  public readonly securityPoliciesInterface: SecurityPoliciesInterfaceOperations;
  /** The operation groups for frontendsInterface */
  public readonly frontendsInterface: FrontendsInterfaceOperations;
  /** The operation groups for associationsInterface */
  public readonly associationsInterface: AssociationsInterfaceOperations;
}
