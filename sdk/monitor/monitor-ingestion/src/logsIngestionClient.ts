// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { SDK_VERSION } from "./constants";
import { GeneratedDataCollectionClient } from "./generated";
import { /*UploadLogsError, */ UploadOptions, UploadResult } from "./models";
import { GZippingPolicy } from "./gZippingPolicy";
import asyncPool from "tiny-async-pool";
// import * as pLimit from "p-limit";

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
    // adding gziping policy bcz this is a single method client which needs gzipping
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
    // split logs into 1MB chunks
    // do we need to worry about memory issues when loading data for 100GB ??
    // JS max allocation is 1 or 2GB
    const chunkArray: any[] = this.splitDataToChunks(logs);
    const noOfChunks = chunkArray.length;
    let count = 0;
    let concurrency = 1;
    if (options?.maxConcurrency && options?.maxConcurrency > 1) {
      concurrency = options?.maxConcurrency;
    }
    console.log("concurrency =", concurrency);

    let uploadResult: UploadResult = {
      errors: [],
      uploadStatus: "Success",
    };

    let errorsArray: Record<string, any>[] = [];
    let promiseCount = 0;
    const upload = async (x: any): Promise<void> => {
      try {
        promiseCount++;
        console.log("promise count after increment", promiseCount);
        console.log(x);
        await this._dataClient.upload(ruleId, streamName, x, {
          contentEncoding: "gzip",
        });
      } catch (e) {
        console.log("this error catch got triggered");
        console.dir(e);
        console.log(JSON.stringify(e));
        errorsArray.push({ error: e, log: count });
      }
      promiseCount--;
      console.log("promiseCount after decrement", promiseCount);
    };

    for await (const _i of asyncPool(concurrency, chunkArray, upload)) {
    }
    for (let errorsObj of errorsArray) {
      uploadResult.errors.push({
        responseError: errorsObj.error,
        failedLogs: chunkArray[errorsObj.log],
      });
    }
    console.log("what is inside uploadResult");
    console.log(JSON.stringify(uploadResult.errors));
    //    let plimitPromises = [];
    //    const limit = pLimit.default(concurrency);
    //    let errorsArray: Record<string, any>[] = [];
    //    let promiseCount = 0;
    //    while (count < noOfChunks) {
    //      const promise = limit(
    //        async (): Promise<void> => {
    //          //you can check the count for promises
    //          promiseCount++;
    //          console.log("promise count", promiseCount);
    //          try{
    //             await this._dataClient.upload(ruleId, streamName, chunkArray[count], {
    //              contentEncoding: "gzip",
    //            });
    //          }
    //          catch(e){
    //            errorsArray.push({"error": e, "log": count})
    //          }
    //           //decrement count of promises);
    //           promiseCount--;
    //           console.log("promiseCount after decrement", promiseCount);
    //        });
    //
    //      plimitPromises.push(promise);
    //      count++;
    //    }
    //
    //    try {
    //      await Promise.all(plimitPromises);
    //      for(let errorsObj of errorsArray){
    //        uploadResult.errors.push({responseError: errorsObj.error, failedLogs: chunkArray[errorsObj.log] })
    //      }
    //    } catch (ex) {
    //      console.log("ERROR", ex);
    //    }

    if (uploadResult.errors.length === 0) {
      return uploadResult;
    } else if (uploadResult.errors.length < noOfChunks && uploadResult.errors.length > 0) {
      uploadResult.uploadStatus = "PartialFailure";
      return uploadResult;
    } else {
      throw Error(`All logs failed for ingestion - ${JSON.stringify(uploadResult.errors)}`);
    }
  }

  splitDataToChunks(logs: Record<string, any>[]): any[] {
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
