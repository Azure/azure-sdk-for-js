// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedOpsContext, ManagedOpsClientOptionalParams } from "./api/index.js";
import { createManagedOps } from "./api/index.js";
import type { ManagedOpsOperations } from "./classic/managedOps/index.js";
import { _getManagedOpsOperations } from "./classic/managedOps/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ManagedOpsClientOptionalParams } from "./api/managedOpsContext.js";

export class ManagedOpsClient {
  private _client: ManagedOpsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Managed Operations API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ManagedOpsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createManagedOps(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.managedOps = _getManagedOpsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for managedOps */
  public readonly managedOps: ManagedOpsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
