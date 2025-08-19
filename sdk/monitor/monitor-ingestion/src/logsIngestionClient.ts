// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogsIngestionContext, LogsIngestionClientOptions } from "./api/index.js";
import { createLogsIngestion } from "./api/index.js";
import type { LogsUploadOptions } from "./api/options.js";
import { upload } from "./api/operations.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { LogsUploadFailure } from "./models/models.js";
import { AggregateLogsUploadError } from "./models/models.js";
import { isError } from "@azure/core-util";
import { GZippingPolicy } from "./gZippingPolicy.js";
import { concurrentRun } from "./utils/concurrentPoolHelper.js";
import { splitDataToChunks } from "./utils/splitDataToChunksHelper.js";
export { LogsIngestionClientOptions } from "./api/logsIngestionContext.js";

const DEFAULT_MAX_CONCURRENCY = 5;

/**
 * Client for Monitor Logs Ingestion
 */
export class LogsIngestionClient {
  private _client: LogsIngestionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Construct a MonitorIngestionClient that can be used to query logs using the Log Analytics Query language.
   *
   * @param tokenCredential - A token credential.
   * @param options - Options for the MonitorIngestionClient.
   */
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

  /**
   * Uploads logs to Monitor Resource
   * @param ruleId - The immutable Id of the Data Collection Rule resource.
   * @param streamName - The streamDeclaration name as defined in the Data Collection Rule.
   * @param logs - An array of objects matching the schema defined by the provided stream.
   * @param options - The options parameters.
   * See error response code and error response message for more detail.
   */
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
