// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext, ComputeClientOptionalParams } from "./api/index.js";
import { createCompute } from "./api/index.js";
import type { BulkCreateCustomOperations } from "./classic/bulkCreateCustom/index.js";
import { _getBulkCreateCustomOperations } from "./classic/bulkCreateCustom/index.js";
import type { LaunchBulkInstancesOperationOperations } from "./classic/launchBulkInstancesOperation/index.js";
import { _getLaunchBulkInstancesOperationOperations } from "./classic/launchBulkInstancesOperation/index.js";
import type { OccurrenceExtensionOperations } from "./classic/occurrenceExtension/index.js";
import { _getOccurrenceExtensionOperations } from "./classic/occurrenceExtension/index.js";
import type { OccurrencesOperations } from "./classic/occurrences/index.js";
import { _getOccurrencesOperations } from "./classic/occurrences/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ScheduledActionExtensionOperations } from "./classic/scheduledActionExtension/index.js";
import { _getScheduledActionExtensionOperations } from "./classic/scheduledActionExtension/index.js";
import type { ScheduledActionOperationStatusOperations } from "./classic/scheduledActionOperationStatus/index.js";
import { _getScheduledActionOperationStatusOperations } from "./classic/scheduledActionOperationStatus/index.js";
import type { ScheduledActionsOperations } from "./classic/scheduledActions/index.js";
import { _getScheduledActionsOperations } from "./classic/scheduledActions/index.js";
import type { VirtualMachineBulkOperationsOperations } from "./classic/virtualMachineBulkOperations/index.js";
import { _getVirtualMachineBulkOperationsOperations } from "./classic/virtualMachineBulkOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ComputeClientOptionalParams } from "./api/computeContext.js";

export class ComputeClient {
  private _client: ComputeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ComputeClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ComputeClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ComputeClientOptionalParams,
    options?: ComputeClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createCompute(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.occurrenceExtension = _getOccurrenceExtensionOperations(this._client);
    this.occurrences = _getOccurrencesOperations(this._client);
    this.scheduledActionOperationStatus = _getScheduledActionOperationStatusOperations(
      this._client,
    );
    this.scheduledActionExtension = _getScheduledActionExtensionOperations(this._client);
    this.scheduledActions = _getScheduledActionsOperations(this._client);
    this.bulkCreateCustom = _getBulkCreateCustomOperations(this._client);
    this.launchBulkInstancesOperation = _getLaunchBulkInstancesOperationOperations(this._client);
    this.virtualMachineBulkOperations = _getVirtualMachineBulkOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for occurrenceExtension */
  public readonly occurrenceExtension: OccurrenceExtensionOperations;
  /** The operation groups for occurrences */
  public readonly occurrences: OccurrencesOperations;
  /** The operation groups for scheduledActionOperationStatus */
  public readonly scheduledActionOperationStatus: ScheduledActionOperationStatusOperations;
  /** The operation groups for scheduledActionExtension */
  public readonly scheduledActionExtension: ScheduledActionExtensionOperations;
  /** The operation groups for scheduledActions */
  public readonly scheduledActions: ScheduledActionsOperations;
  /** The operation groups for bulkCreateCustom */
  public readonly bulkCreateCustom: BulkCreateCustomOperations;
  /** The operation groups for launchBulkInstancesOperation */
  public readonly launchBulkInstancesOperation: LaunchBulkInstancesOperationOperations;
  /** The operation groups for virtualMachineBulkOperations */
  public readonly virtualMachineBulkOperations: VirtualMachineBulkOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
