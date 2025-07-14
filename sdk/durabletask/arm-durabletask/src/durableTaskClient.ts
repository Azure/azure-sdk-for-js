// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createDurableTask,
  DurableTaskContext,
  DurableTaskClientOptionalParams,
} from "./api/index.js";
import {
  RetentionPoliciesOperations,
  _getRetentionPoliciesOperations,
} from "./classic/retentionPolicies/index.js";
import { TaskHubsOperations, _getTaskHubsOperations } from "./classic/taskHubs/index.js";
import { SchedulersOperations, _getSchedulersOperations } from "./classic/schedulers/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { DurableTaskClientOptionalParams } from "./api/durableTaskContext.js";

export class DurableTaskClient {
  private _client: DurableTaskContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DurableTaskClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDurableTask(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.retentionPolicies = _getRetentionPoliciesOperations(this._client);
    this.taskHubs = _getTaskHubsOperations(this._client);
    this.schedulers = _getSchedulersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for retentionPolicies */
  public readonly retentionPolicies: RetentionPoliciesOperations;
  /** The operation groups for taskHubs */
  public readonly taskHubs: TaskHubsOperations;
  /** The operation groups for schedulers */
  public readonly schedulers: SchedulersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
