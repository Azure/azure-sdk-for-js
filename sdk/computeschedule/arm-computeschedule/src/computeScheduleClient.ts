// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createComputeSchedule,
  ComputeScheduleContext,
  ComputeScheduleClientOptionalParams,
} from "./api/index.js";
import {
  OccurrenceExtensionOperations,
  _getOccurrenceExtensionOperations,
} from "./classic/occurrenceExtension/index.js";
import { OccurrencesOperations, _getOccurrencesOperations } from "./classic/occurrences/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ScheduledActionExtensionOperations,
  _getScheduledActionExtensionOperations,
} from "./classic/scheduledActionExtension/index.js";
import {
  ScheduledActionsOperations,
  _getScheduledActionsOperations,
} from "./classic/scheduledActions/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    this.occurrenceExtension = _getOccurrenceExtensionOperations(this._client);
    this.occurrences = _getOccurrencesOperations(this._client);
    this.scheduledActionExtension = _getScheduledActionExtensionOperations(this._client);
    this.scheduledActions = _getScheduledActionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for occurrenceExtension */
  public readonly occurrenceExtension: OccurrenceExtensionOperations;
  /** The operation groups for occurrences */
  public readonly occurrences: OccurrencesOperations;
  /** The operation groups for scheduledActionExtension */
  public readonly scheduledActionExtension: ScheduledActionExtensionOperations;
  /** The operation groups for scheduledActions */
  public readonly scheduledActions: ScheduledActionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
