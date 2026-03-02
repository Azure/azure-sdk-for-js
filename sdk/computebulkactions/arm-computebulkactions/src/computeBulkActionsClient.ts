// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeBulkActionsContext,
  ComputeBulkActionsClientOptionalParams,
} from "./api/index.js";
import { createComputeBulkActions } from "./api/index.js";
import type { BulkActionsOperations } from "./classic/bulkActions/index.js";
import { _getBulkActionsOperations } from "./classic/bulkActions/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeBulkActionsClientOptionalParams } from "./api/computeBulkActionsContext.js";

export class ComputeBulkActionsClient {
  private _client: ComputeBulkActionsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.ComputeBulkActions Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeBulkActionsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeBulkActions(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.bulkActions = _getBulkActionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for bulkActions */
  public readonly bulkActions: BulkActionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
