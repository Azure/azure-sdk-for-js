// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getFabricCapacitiesOperations,
  FabricCapacitiesOperations,
} from "./classic/fabricCapacities/index.js";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  createFabric,
  FabricContext,
  FabricClientOptionalParams,
} from "./api/index.js";

export { FabricClientOptionalParams } from "./api/fabricContext.js";

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
    this.fabricCapacities = getFabricCapacitiesOperations(
      this._client,
      subscriptionId,
    );
    this.operations = getOperationsOperations(this._client);
  }

  /** The operation groups for FabricCapacities */
  public readonly fabricCapacities: FabricCapacitiesOperations;
  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
}
