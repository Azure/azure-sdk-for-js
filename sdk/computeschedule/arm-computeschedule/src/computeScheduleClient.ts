// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  getScheduledActionsOperations,
  ScheduledActionsOperations,
} from "./classic/scheduledActions/index.js";
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
    this._client = createComputeSchedule(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.scheduledActions = getScheduledActionsOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for ScheduledActions */
  public readonly scheduledActions: ScheduledActionsOperations;
}
