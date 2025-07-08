// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createCarbon, CarbonContext, CarbonClientOptionalParams } from "./api/index.js";
import {
  CarbonServiceOperations,
  _getCarbonServiceOperations,
} from "./classic/carbonService/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { CarbonClientOptionalParams } from "./api/carbonContext.js";

export class CarbonClient {
  private _client: CarbonContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Carbon Report Resource Provider query API. */
  constructor(credential: TokenCredential, options: CarbonClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCarbon(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.carbonService = _getCarbonServiceOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for carbonService */
  public readonly carbonService: CarbonServiceOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
