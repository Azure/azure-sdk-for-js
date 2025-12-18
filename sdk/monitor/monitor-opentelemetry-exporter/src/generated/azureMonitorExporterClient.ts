// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAzureMonitorExporter,
  AzureMonitorExporterContext,
  AzureMonitorExporterClientOptionalParams,
} from "./api/index.js";
import { track } from "./api/operations.js";
import { TrackOptionalParams } from "./api/options.js";
import { TelemetryItem, TrackResponse } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { AzureMonitorExporterClientOptionalParams } from "./api/azureMonitorExporterContext.js";

export class AzureMonitorExporterClient {
  private _client: AzureMonitorExporterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** OpenTelemetry Exporter for Azure Monitor */
  constructor(
    credential: any | TokenCredential,
    options: AzureMonitorExporterClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureMonitorExporter(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
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
