// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _getScheduledActionsOperations,
  ScheduledActionsOperations,
} from "./classic/scheduledActions/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  createComputeSchedule,
  ComputeScheduleContext,
  ComputeScheduleClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ComputeScheduleClientOptionalParams } from "./api/computeScheduleContext.js";

export class ComputeScheduleClient {
  private _client: ComputeScheduleContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.ComputeSchedule Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeScheduleClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeSchedule(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.scheduledActions = _getScheduledActionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for scheduledActions */
  public readonly scheduledActions: ScheduledActionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
