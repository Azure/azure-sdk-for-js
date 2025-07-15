// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  LogsIngestionContext,
  LogsIngestionClientOptions} from "./api/index.js";
import {
  createLogsIngestion
} from "./api/index.js";
import type { LogsUploadOptions } from "./api/options.js";
import { upload } from "./api/operations.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { LogsUploadFailure } from "./models/models.js";
import { AggregateLogsUploadError } from "./models/models.js";
import { isError } from "@azure/core-util";
import { GZippingPolicy } from "./gZippingPolicy.js";
import { concurrentRun } from "./utils/concurrentPoolHelper.js";
import { splitDataToChunks } from "./utils/splitDataIntoChunksHelper.js";
export { LogsIngestionClientOptions } from "./api/logsIngestionContext.js";

const DEFAULT_MAX_CONCURRENCY = 5;

export class LogsIngestionClient {
  private _client: LogsIngestionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Monitor data collection client. */
  constructor(
    endpoint: string,
    tokenCredential: TokenCredential,
    options?: LogsIngestionClientOptions,
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createLogsIngestion(endpoint, tokenCredential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.pipeline.addPolicy(GZippingPolicy);
  }

  /** Ingestion API used to directly ingest data using Data Collection Rules. */
  async upload(
    ruleId: string,
    streamName: string,
    logs: Record<string, unknown>[],
    options?: LogsUploadOptions,
  ): Promise<void> {
    // TODO: Do we need to worry about memory issues when loading data for 100GB ?? JS max allocation is 1 or 2GB

    // This splits logs into 1MB chunks
    const chunkArray = splitDataToChunks(logs);
    const concurrency = Math.max(options?.maxConcurrency ?? DEFAULT_MAX_CONCURRENCY, 1);

    const uploadResultErrors: Array<LogsUploadFailure> = [];
    await concurrentRun(
      concurrency,
      chunkArray,
      async (eachChunk: Record<string, unknown>[]): Promise<void> => {
        try {
          await upload(this._client, ruleId, streamName, eachChunk, {
            contentEncoding: "gzip",
            abortSignal: options?.abortSignal,
          });
        } catch (e: unknown) {
          if (options?.onError) {
            options.onError({
              failedLogs: eachChunk,
              cause: isError(e) ? e : new Error(e as string),
            });
          }
          uploadResultErrors.push({
            cause: isError(e) ? e : new Error(e as string),
            failedLogs: eachChunk,
          });
        }
      },
      options?.abortSignal,
    );
    if (uploadResultErrors.length > 0) {
      throw new AggregateLogsUploadError(uploadResultErrors);
    }
    return Promise.resolve();
  }
}
