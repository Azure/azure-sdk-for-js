// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeScheduleContext,
  ComputeScheduleClientOptionalParams} from "./api/index.js";
import {
  createComputeSchedule
} from "./api/index.js";
import type {
  OccurrenceExtensionOperations} from "./classic/occurrenceExtension/index.js";
import {
  _getOccurrenceExtensionOperations,
} from "./classic/occurrenceExtension/index.js";
import type { OccurrencesOperations} from "./classic/occurrences/index.js";
import { _getOccurrencesOperations } from "./classic/occurrences/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type {
  ScheduledActionExtensionOperations} from "./classic/scheduledActionExtension/index.js";
import {
  _getScheduledActionExtensionOperations,
} from "./classic/scheduledActionExtension/index.js";
import type {
  ScheduledActionsOperations} from "./classic/scheduledActions/index.js";
import {
  _getScheduledActionsOperations,
} from "./classic/scheduledActions/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ComputeScheduleClientOptionalParams } from "./api/computeScheduleContext.js";

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
