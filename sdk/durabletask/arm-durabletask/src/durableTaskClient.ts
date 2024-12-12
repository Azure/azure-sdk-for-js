// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getSchedulersOperations,
  SchedulersOperations,
} from "./classic/schedulers/index.js";
import {
  getTaskHubsOperations,
  TaskHubsOperations,
} from "./classic/taskHubs/index.js";
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
    this._client = createDurableTask(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.schedulers = getSchedulersOperations(this._client, subscriptionId);
    this.taskHubs = getTaskHubsOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Schedulers */
  public readonly schedulers: SchedulersOperations;
  /** The operation groups for TaskHubs */
  public readonly taskHubs: TaskHubsOperations;
}
