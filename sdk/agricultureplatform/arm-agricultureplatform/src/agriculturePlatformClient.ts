// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAgriculturePlatform,
  AgriculturePlatformContext,
  AgriculturePlatformClientOptionalParams,
} from "./api/index.js";
import { AgriServiceOperations, _getAgriServiceOperations } from "./classic/agriService/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AgriculturePlatformClientOptionalParams } from "./api/agriculturePlatformContext.js";

export class AgriculturePlatformClient {
  private _client: AgriculturePlatformContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AgriculturePlatformClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAgriculturePlatform(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.agriService = _getAgriServiceOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for agriService */
  public readonly agriService: AgriServiceOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
