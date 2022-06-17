// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { SDK_VERSION } from "./constants";
import { GeneratedDataCollectionClient } from "./generated";
import { UploadOptions, UploadResult } from "./models";
import { GZippingPolicy } from "./gZippingPolicy";
import * as pLimit from "p-limit";
import { rejects } from "assert";
import { resolve } from "dns";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

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
  endpoint: string;
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
    const packageDetails = `azsdk-js-monitor-ingestion/${SDK_VERSION}`;
    const userAgentPrefix =
      options?.userAgentOptions && options?.userAgentOptions.userAgentPrefix
        ? `${options?.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;
    this._dataClient = new GeneratedDataCollectionClient(tokenCredential, this.endpoint, {
      ...options,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultIngestionScope,
      userAgentOptions: {
        userAgentPrefix,
      },
    });
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
    logs: Record<string, unknown>[],
    options?: UploadOptions
  ): Promise<UploadResult> {
    // split logs into 1MB chunks
    const chunkArray: any[] = this.splitDataToChunks(logs);
    const noOfChunks = chunkArray.length;
    let count = 0;
    let concurrency = 1;
    if (options?.maxConcurrency && options?.maxConcurrency > 1) {
      concurrency = options?.maxConcurrency;
    }
    console.log("concurrency =", concurrency);
    // while (count < noOfChunks) {
    //   try {
    //     await this._dataClient.upload(ruleId, streamName, chunkArray[count], {
    //       contentEncoding: "gzip",
    //     });
    //   } catch (e) {
    //     failedLogs.push(chunkArray[count]);
    //     errors.push(e);
    //   }
    //   count++;
    // }

    let plimitPromises = [];
    const limit = pLimit(concurrency);
    while (count < noOfChunks) {
      const promise = limit(
        () =>
          new Promise<void>(async (res, rej) => {
            let uploadProcess = this._dataClient.upload(ruleId, streamName, chunkArray[count], {
              contentEncoding: "gzip",
            });
            uploadProcess.catch((e) => {
              rej(`{"error": ${e}, "log": ${count}}`);
            });
            uploadProcess.then(() => {
              res();
            })
          })
      );
      plimitPromises.push(promise);
      count++;
    }
    let uploadResult: UploadResult = {
      errors: [],
      uploadStatus: "Success",
    };
    try {
      const results = await Promise.all(plimitPromises);
      for (let item of results) {
        console.dir(item);
        if (item) {
          let x = JSON.parse(item);
          uploadResult.errors.push({ responseError: x.error, failedLogs: chunkArray[x.log] });
        }
      }
    } catch (ex) {
      console.log("ERROR", ex);
    }

    if (uploadResult.errors.length === 0) {
      return uploadResult;
    } else if (uploadResult.errors.length < noOfChunks && uploadResult.errors.length > 0) {
      uploadResult.uploadStatus = "PartialFailure";
      return uploadResult;
    } else {
      throw Error(`All logs failed for ingestion - ${uploadResult.errors.toString()}`);
    }
  }

  splitDataToChunks(logs: Record<string, unknown>[]): any[] {
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
        console.log("Sending chunk...");
        console.log(chunk);
        chunkArray.push(chunk);
        chunk = [element];
        size = 0;
      }
    }

    if (chunk.length) {
      console.log("Sending chunk...");
      console.log(chunk);
      chunkArray.push(chunk);
    }

    return chunkArray;
  }
}
