// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "@azure/core-rest-pipeline";
import "./models/options.js";
import type { SystemEventsClientOptionalParams, SystemEventsContext } from "./api/index.js";
import { createSystemEvents } from "./api/index.js";

export { SystemEventsClientOptionalParams } from "./api/systemEventsContext.js";

export class SystemEventsClient {
  private _client: SystemEventsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Messaging EventGrid SystemEvents */
  constructor(endpoint: string, options: SystemEventsClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : "azsdk-js-client";

    this._client = createSystemEvents(endpoint, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }
}
