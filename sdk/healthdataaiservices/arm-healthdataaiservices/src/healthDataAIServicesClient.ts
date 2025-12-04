// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createHealthDataAIServices,
  HealthDataAIServicesContext,
  HealthDataAIServicesClientOptionalParams,
} from "./api/index.js";
import {
  DeidServicesOperations,
  _getDeidServicesOperations,
} from "./classic/deidServices/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinksOperations,
  _getPrivateLinksOperations,
} from "./classic/privateLinks/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { HealthDataAIServicesClientOptionalParams } from "./api/healthDataAIServicesContext.js";

export class HealthDataAIServicesClient {
  private _client: HealthDataAIServicesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HealthDataAIServicesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHealthDataAIServices(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinks = _getPrivateLinksOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.deidServices = _getDeidServicesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for privateLinks */
  public readonly privateLinks: PrivateLinksOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for deidServices */
  public readonly deidServices: DeidServicesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
