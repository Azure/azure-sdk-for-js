// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext, QueuesClientOptionalParams, createQueues } from "./api/index.js";
import { QueueOperations, _getQueueOperations } from "./classic/queue/index.js";
import { ServiceOperations, _getServiceOperations } from "./classic/service/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { QueuesClientOptionalParams } from "./api/queuesContext.js";

export class QueuesClient {
  private _client: QueuesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: QueuesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createQueues(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.queue = _getQueueOperations(this._client);
    this.service = _getServiceOperations(this._client);
  }

  /** The operation groups for queue */
  public readonly queue: QueueOperations;
  /** The operation groups for service */
  public readonly service: ServiceOperations;
}
