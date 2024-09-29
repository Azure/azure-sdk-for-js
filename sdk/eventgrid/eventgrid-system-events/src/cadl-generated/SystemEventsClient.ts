// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Pipeline } from "@azure/core-rest-pipeline";
import "./models/options";
import {
  createSystemEvents,
  SystemEventsClientOptionalParams,
  SystemEventsContext,
} from "./api/index";

export { SystemEventsClientOptionalParams } from "./api/systemEventsContext";

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
