// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { GeneratedMonitorIngestionClient } from "./generated";
import { AggregateUploadLogsError, UploadLogsFailure, UploadLogsOptions } from "./models";
import { GZippingPolicy } from "./gZippingPolicy";
import { concurrentRun } from "./utils/concurrentPoolHelper";
import { splitDataToChunks } from "./utils/splitDataToChunksHelper";
import { isError } from "@azure/core-util";
/**
 * Options for Monitor Logs Ingestion Client
 */
export interface LogsIngestionClientOptions extends CommonClientOptions {
  /** Api Version */
  apiVersion?: string;
}
const defaultIngestionScope = "https://monitor.azure.com//.default";
const DEFAULT_MAX_CONCURRENCY = 5;

/**
 * Client for Monitor Logs Ingestion
 */
export class LogsIngestionClient {
  /**
   * Overrides client endpoint.
   */
  private endpoint: string;
  private _dataClient: GeneratedMonitorIngestionClient;
  /**
   * Construct a MonitorIngestionClient that can be used to query logs using the Log Analytics Query language.
   *
   * @param tokenCredential - A token credential.
   * @param options - Options for the MonitorIngestionClient.
   */
  constructor(
    endpoint: string,
    tokenCredential: TokenCredential,
    options?: LogsIngestionClientOptions
  ) {
    this.endpoint = endpoint;
    this._dataClient = new GeneratedMonitorIngestionClient(tokenCredential, this.endpoint, {
      ...options,
      credentialScopes: defaultIngestionScope,
    });
    // adding gzipping policy because this is a single method client which needs gzipping
    this._dataClient.pipeline.addPolicy(GZippingPolicy);
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: UploadLogsOptions
  ): Promise<void> {
    // TODO: Do we need to worry about memory issues when loading data for 100GB ?? JS max allocation is 1 or 2GB

    // This splits logs into 1MB chunks
    const chunkArray = splitDataToChunks(logs);
    const concurrency = Math.max(options?.maxConcurrency ?? DEFAULT_MAX_CONCURRENCY, 1);

    const uploadResultErrors: Array<UploadLogsFailure> = [];
    await concurrentRun(
      concurrency,
      chunkArray,
      async (eachChunk): Promise<void> => {
        try {
          await this._dataClient.upload(ruleId, streamName, eachChunk, {
            contentEncoding: "gzip",
            abortSignal: options?.abortSignal,
          });
        } catch (e: any) {
          if (options?.onError) {
            options.onError({ failedLogs: eachChunk, cause: isError(e) ? e : new Error(e) });
          }
          uploadResultErrors.push({
            cause: isError(e) ? e : new Error(e),
            failedLogs: eachChunk,
          });
        }
      },
      options?.abortSignal
    );
    if (uploadResultErrors.length > 0) {
      throw new AggregateUploadLogsError(uploadResultErrors);
    }
  }
}
