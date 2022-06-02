// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CommonClientOptions } from "@azure/core-client";
import { SDK_VERSION } from "./constants";
import { GeneratedDataCollectionClient } from "./generated";
import { sendLogsOptions, sendLogsResult, SendLogsStatus } from "./models";

/**
 * Options for Montior Logs Ingestion Client
 */
export interface LogsIngestionClientOptions extends CommonClientOptions {
  /** Api Version */
  apiVersion?: string;
}
const defaultIngestionScope = "<default_scope>";

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
  constructor(tokenCredential: TokenCredential, endpoint: string, options?: LogsIngestionClientOptions) {
    let scope;
    if (endpoint) {
      scope = `${endpoint}/.default`;
    }
    const credentialOptions = {
      credentialScopes: scope,
    };
    this.endpoint = endpoint;
    const packageDetails = `azsdk-js-monitor-ingestion/${SDK_VERSION}`;
    const userAgentPrefix =
      options?.userAgentOptions && options?.userAgentOptions.userAgentPrefix
        ? `${options?.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;
    this._dataClient = new GeneratedDataCollectionClient(this.endpoint, {
      ...options,
      endpoint: this.endpoint,
      credentialScopes: credentialOptions?.credentialScopes ?? defaultIngestionScope,
      credential: tokenCredential,
      userAgentOptions: {
        userAgentPrefix,
      },
    })
  }

  /**
 * See error response code and error response message for more detail.
 * @param ruleId The immutable Id of the Data Collection Rule resource.
 * @param stream The streamDeclaration name as defined in the Data Collection Rule.
 * @param logs An array of objects matching the schema defined by the provided stream.
 * @param options The options parameters.
 */
  async sendLogs(
    ruleId: string,
    stream: string,
    logs: Record<string, unknown>[],
    options?: sendLogsOptions
  ): Promise<sendLogsResult> {
    //yet-to-be-implemented
    if (options?.concurrency && options?.concurrency > 1) {
      throw ("Concurrency yet to be implemeted");
    }
    else {
      try {
        let noOfChunks = 1;
        let count = 0;
        let failedLogsIndex = [];
        while (count < noOfChunks) {
          try {
            await this._dataClient.dataCollectionRule.ingest(ruleId, stream, logs, {
              contentEncoding: "gzip"
            });
          }
          catch (e) {
            //this will eventullay be the actual index ranges in the chunk
            failedLogsIndex.push(count);
          }
          count++;
        }
        let sendLogsResult: sendLogsResult = {
          failedLogsIndex: [],
          sendLogsStatus: SendLogsStatus.Success
        }
        if (failedLogsIndex.length === 0) {
          return sendLogsResult;
        }
        else if (failedLogsIndex.length < noOfChunks && failedLogsIndex.length > 0) {

          sendLogsResult = { failedLogsIndex: failedLogsIndex, sendLogsStatus: SendLogsStatus.PartialFailure };
          return sendLogsResult;
        }
        else
          throw Error("All logs failed for the ingestion");
      }
      catch (e) {
        throw e;
      }
    }
  }
}
