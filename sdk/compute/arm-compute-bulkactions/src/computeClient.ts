// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext, ComputeClientOptionalParams } from "./api/index.js";
import { createCompute } from "./api/index.js";
import type { BulkCreateOperations } from "./classic/bulkCreate/index.js";
import { _getBulkCreateOperations } from "./classic/bulkCreate/index.js";
import type { BulkCreateCustomOperations } from "./classic/bulkCreateCustom/index.js";
import { _getBulkCreateCustomOperations } from "./classic/bulkCreateCustom/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { VirtualMachineBulkOperationsOperations } from "./classic/virtualMachineBulkOperations/index.js";
import { _getVirtualMachineBulkOperationsOperations } from "./classic/virtualMachineBulkOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ComputeClientOptionalParams } from "./api/computeContext.js";

export class ComputeClient {
  private _client: ComputeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeClientOptionalParams = {},
  ) {
    this._client = createCompute(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.bulkCreate = _getBulkCreateOperations(this._client);
    this.bulkCreateCustom = _getBulkCreateCustomOperations(this._client);
    this.virtualMachineBulkOperations = _getVirtualMachineBulkOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for bulkCreate */
  public readonly bulkCreate: BulkCreateOperations;
  /** The operation groups for bulkCreateCustom */
  public readonly bulkCreateCustom: BulkCreateCustomOperations;
  /** The operation groups for virtualMachineBulkOperations */
  public readonly virtualMachineBulkOperations: VirtualMachineBulkOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
