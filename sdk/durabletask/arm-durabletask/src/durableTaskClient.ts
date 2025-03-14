// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { _getTaskHubsOperations, TaskHubsOperations } from "./classic/taskHubs/index.js";
import { _getSchedulersOperations, SchedulersOperations } from "./classic/schedulers/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  createDurableTask,
  DurableTaskContext,
  DurableTaskClientOptionalParams,
} from "./api/index.js";
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
    this.taskHubs = _getTaskHubsOperations(this._client);
    this.schedulers = _getSchedulersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for taskHubs */
  public readonly taskHubs: TaskHubsOperations;
  /** The operation groups for schedulers */
  public readonly schedulers: SchedulersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
