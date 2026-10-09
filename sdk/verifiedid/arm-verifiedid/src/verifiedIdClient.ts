// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VerifiedIdContext, VerifiedIdClientOptionalParams } from "./api/index.js";
import { createVerifiedId } from "./api/index.js";
import type { AuthoritiesOperations } from "./classic/authorities/index.js";
import { _getAuthoritiesOperations } from "./classic/authorities/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { VerifiedIdClientOptionalParams } from "./api/verifiedIdContext.js";

export class VerifiedIdClient {
  private _client: VerifiedIdContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** VerifiedId Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: VerifiedIdClientOptionalParams = {},
  ) {
    this._client = createVerifiedId(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.authorities = _getAuthoritiesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for authorities */
  public readonly authorities: AuthoritiesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
