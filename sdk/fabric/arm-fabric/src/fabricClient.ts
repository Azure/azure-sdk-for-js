// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FabricCapacitiesOperations} from "./classic/fabricCapacities/index.js";
import {
  getFabricCapacitiesOperations
} from "./classic/fabricCapacities/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { getOperationsOperations } from "./classic/operations/index.js";
import type { FabricContext, FabricClientOptionalParams } from "./api/index.js";
import { createFabric } from "./api/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { FabricClientOptionalParams } from "./api/fabricContext.js";

export class FabricClient {
  private _client: FabricContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: FabricClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : "azsdk-js-client";
    this._client = createFabric(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.fabricCapacities = getFabricCapacitiesOperations(this._client, subscriptionId);
    this.operations = getOperationsOperations(this._client);
  }

  /** The operation groups for FabricCapacities */
  public readonly fabricCapacities: FabricCapacitiesOperations;
  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
}
