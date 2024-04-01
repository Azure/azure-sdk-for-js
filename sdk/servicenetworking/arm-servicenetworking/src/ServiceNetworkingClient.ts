// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getAssociationsInterfaceOperations,
  AssociationsInterface,
} from "./classic/associationsInterface/index.js";
import {
  getFrontendsInterfaceOperations,
  FrontendsInterface,
} from "./classic/frontendsInterface/index.js";
import {
  getTrafficControllerInterfaceOperations,
  TrafficControllerInterface,
} from "./classic/trafficControllerInterface/index.js";
import {
  getOperationsOperations,
  Operations,
} from "./classic/operations/index.js";
import {
  createServiceNetworking,
  ServiceNetworkingClientOptions,
  ServiceNetworkingContext,
} from "./api/index.js";

export { ServiceNetworkingClientOptions } from "./api/ServiceNetworkingContext.js";

export class ServiceNetworkingClient {
  private _client: ServiceNetworkingContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Traffic Controller Provider management API. */
  constructor(
    credential: TokenCredential,
    options: ServiceNetworkingClientOptions = {},
  ) {
    this._client = createServiceNetworking(credential, options);
    this.pipeline = this._client.pipeline;
    this.associationsInterface = getAssociationsInterfaceOperations(
      this._client,
    );
    this.frontendsInterface = getFrontendsInterfaceOperations(this._client);
    this.trafficControllerInterface = getTrafficControllerInterfaceOperations(
      this._client,
    );
    this.operations = getOperationsOperations(this._client);
  }

  /** The operation groups for AssociationsInterface */
  public readonly associationsInterface: AssociationsInterface;
  /** The operation groups for FrontendsInterface */
  public readonly frontendsInterface: FrontendsInterface;
  /** The operation groups for TrafficControllerInterface */
  public readonly trafficControllerInterface: TrafficControllerInterface;
  /** The operation groups for Operations */
  public readonly operations: Operations;
}
