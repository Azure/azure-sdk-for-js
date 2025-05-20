// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createSystemEvents,
  SystemEventsContext,
  SystemEventsClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";

export { SystemEventsClientOptionalParams } from "./api/systemEventsContext.js";

export class SystemEventsClient {
  private _client: SystemEventsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Messaging EventGrid SystemEvents */
  constructor(
    endpointParam: string,
    options: SystemEventsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSystemEvents(endpointParam, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }
}
