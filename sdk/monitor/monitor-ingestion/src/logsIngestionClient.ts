// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { GeneratedDataCollectionClient } from "./generated";
import { UploadLogsError, UploadOptions, UploadResult, UploadStatus } from "./models";
import { GZippingPolicy } from "./gZippingPolicy";
import { asyncPool } from "./concurrentPoolHelper";

/**
 * Options for Montior Logs Ingestion Client
 */
export interface LogsIngestionClientOptions extends CommonClientOptions {
  /** Api Version */
  apiVersion?: string;
}
const defaultIngestionScope = "https://monitor.azure.com//.default";

/**
 * Client for Monitor Logs Ingestion
 */
export class LogsIngestionClient {
  /**
   * Overrides client endpoint.
   */
  private endpoint: string;
  private _dataClient: GeneratedDataCollectionClient;
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
    const credentialOptions = {
      credentialScopes: defaultIngestionScope,
    };
    this.endpoint = endpoint;
    this._dataClient = new GeneratedDataCollectionClient(tokenCredential, this.endpoint, {
      ...options,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultIngestionScope
    });
    // adding gziping policy because this is a single method client which needs gzipping
    this._dataClient.pipeline.addPolicy(GZippingPolicy);
  }

  /**
   * See error response code and error response message for more detail.
   * @param ruleId - The immutable Id of the Data Collection Rule resource.
   * @param streamName - The streamDeclaration name as defined in the Data Collection Rule.
   * @param logs - An array of objects matching the schema defined by the provided stream.
   * @param options - The options parameters.
   */
  async upload(
    ruleId: string,
    streamName: string,
    logs: Record<string, any>[],
    options?: UploadOptions
  ): Promise<UploadResult> {
    // TODO: Do we need to worry about memory issues when loading data for 100GB ?? JS max allocation is 1 or 2GB

    // This splits logs into 1MB chunks
    const chunkArray: any[] = this.splitDataToChunks(logs);
    const noOfChunks = chunkArray.length;
    let concurrency = 1;
    if (options?.maxConcurrency && options?.maxConcurrency > 1) {
      concurrency = options?.maxConcurrency;
    }

    let uploadResultErrors: Array<UploadLogsError> = [];
    let uploadResult: UploadResult = {
      uploadStatus: UploadStatus.Success
    };

    const errorsArray: Record<string, any>[] = [];
    const uploadCallback = async (x: any): Promise<void> => {
      try {
        await this._dataClient.upload(ruleId, streamName, x, {
          contentEncoding: "gzip",
        });
      } catch (e: any) {
        errorsArray.push({ error: e, log: x });
      }
    };

    for await (const _i of asyncPool(concurrency, chunkArray, uploadCallback)) {
      /* eslint-disable no-empty */
    }
    for (const errorsObj of errorsArray) {
      uploadResultErrors.push({
        responseError: errorsObj.error,
        failedLogs: errorsObj.log,
      });
    }

    if (uploadResultErrors.length === 0) {
      return uploadResult;
    } else if (uploadResultErrors.length < noOfChunks && uploadResultErrors.length > 0) {
      uploadResult = {
        errors: uploadResultErrors,
        uploadStatus: UploadStatus.PartialFailure
      }
      return uploadResult;
    } else {
      uploadResult = {
        errors: uploadResultErrors,
        uploadStatus: UploadStatus.Failure
      }
      return uploadResult;
    }
  }

  /**
   * @internal
   */
  private splitDataToChunks(logs: Record<string, any>[]): any[] {
    let chunk: any[] = [];
    const chunkArray: any[] = [];
    let size = 0;
    const maxBytes = 1000000;
    for (const element of logs) {
      const elementSize = JSON.stringify(element).length * 4;

      if (size + elementSize < maxBytes) {
        chunk.push(element);
        size += elementSize;
      } else {
        chunkArray.push(chunk);
        chunk = [element];
        size = elementSize;
      }
    }

    if (chunk.length) {
      chunkArray.push(chunk);
    }

    return chunkArray;
  }
}
