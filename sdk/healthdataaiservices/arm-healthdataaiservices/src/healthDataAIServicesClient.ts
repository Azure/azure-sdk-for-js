// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationsOperations } from "./classic/operations/index.js";
import { getOperationsOperations } from "./classic/operations/index.js";
import type { DeidServicesOperations } from "./classic/deidServices/index.js";
import { getDeidServicesOperations } from "./classic/deidServices/index.js";
import type {
  PrivateEndpointConnectionsOperations} from "./classic/privateEndpointConnections/index.js";
import {
  getPrivateEndpointConnectionsOperations
} from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinksOperations } from "./classic/privateLinks/index.js";
import { getPrivateLinksOperations } from "./classic/privateLinks/index.js";
import type {
  HealthDataAIServicesContext,
  HealthDataAIServicesClientOptionalParams} from "./api/index.js";
import {
  createHealthDataAIServices
} from "./api/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { HealthDataAIServicesClientOptionalParams } from "./api/healthDataAIServicesContext.js";

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
    this._client = createHealthDataAIServices(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.deidServices = getDeidServicesOperations(this._client, subscriptionId);
    this.privateEndpointConnections = getPrivateEndpointConnectionsOperations(
      this._client,
      subscriptionId,
    );
    this.privateLinks = getPrivateLinksOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for DeidServices */
  public readonly deidServices: DeidServicesOperations;
  /** The operation groups for PrivateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for PrivateLinks */
  public readonly privateLinks: PrivateLinksOperations;
}
