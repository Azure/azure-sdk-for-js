// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ManagedOpsContext,
  ManagedOpsClientOptionalParams,
  createManagedOps,
} from "./api/index.js";
import { ManagedOpsOperations, _getManagedOpsOperations } from "./classic/managedOps/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ManagedOpsClientOptionalParams } from "./api/managedOpsContext.js";

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
