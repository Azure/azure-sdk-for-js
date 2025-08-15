// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createLogsIngestion,
  LogsIngestionContext,
  LogsIngestionClientOptionalParams,
} from "./api/index.js";
import { upload } from "./api/operations.js";
import { UploadOptionalParams } from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { LogsIngestionClientOptionalParams } from "./api/logsIngestionContext.js";

export class LogsIngestionClient {
  private _client: LogsIngestionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Monitor data collection client. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: LogsIngestionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createLogsIngestion(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Ingestion API used to directly ingest data using Data Collection Rules. */
  upload(
    ruleId: string,
    streamName: string,
    body: Record<string, any>[],
    options: UploadOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return upload(this._client, ruleId, streamName, body, options);
  }
}
