// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SovereignContext, SovereignClientOptionalParams } from "./api/index.js";
import { createSovereign } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SovereignViewOperationsOperations } from "./classic/sovereignViewOperations/index.js";
import { _getSovereignViewOperationsOperations } from "./classic/sovereignViewOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SovereignClientOptionalParams } from "./api/sovereignContext.js";

export class SovereignClient {
  private _client: SovereignContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SovereignClientOptionalParams = {},
  ) {
    this._client = createSovereign(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.sovereignViewOperations = _getSovereignViewOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for sovereignViewOperations */
  public readonly sovereignViewOperations: SovereignViewOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
