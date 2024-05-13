// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Pipeline } from "@azure/core-rest-pipeline";
import "./models/options";
import { createSystemEvents, SystemEventsClientOptions, SystemEventsContext } from "./api/index";

export { SystemEventsClientOptions } from "./api/SystemEventsContext";

export class SystemEventsClient {
  private _client: SystemEventsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Messaging EventGrid SystemEvents */
  constructor(endpoint: string, options: SystemEventsClientOptions = {}) {
    this._client = createSystemEvents(endpoint, options);
    this.pipeline = this._client.pipeline;
  }
}
