// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApplicationInsightsContext,
  ApplicationInsightsClientOptionalParams,
  createApplicationInsights,
} from "./api/index.js";
import { track } from "./api/operations.js";
import { TrackOptionalParams } from "./api/options.js";
import { TelemetryItem, TrackResponse } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ApplicationInsightsClientOptionalParams } from "./api/applicationInsightsContext.js";

export class ApplicationInsightsClient {
  private _client: ApplicationInsightsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** OpenTelemetry Exporter for Azure Monitor */
  constructor(
    credential: any | TokenCredential,
    options: ApplicationInsightsClientOptionalParams = {},
  ) {
    this._client = createApplicationInsights(credential, options);
    this.pipeline = this._client.pipeline;
  }

  /**
   * This operation sends a sequence of telemetry events that will be monitored by
   * Azure Monitor.
   */
  track(
    body: TelemetryItem[],
    options: TrackOptionalParams = { requestOptions: {} },
  ): Promise<TrackResponse> {
    return track(this._client, body, options);
  }
}
