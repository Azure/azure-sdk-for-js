// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";
import { BatchRequest, QueryBatchResponse } from "./generated/logquery/src";
import { QueryLogsBatchOptions, QueryLogsOptions, QueryLogsResult } from "./models/logsModels";
import { formatPreferHeader } from "./internal/util";

export interface LogsClientOptions {
  /**
   * The host to connect to.
   *
   * Defaults to 'https://api.loganalytics.io/v1'.
   */
  host?: string;
}

/**
 * Client for Azure Log Analytics
 */
export class LogsClient {
  private _logAnalytics: AzureLogAnalytics;

  constructor(tokenCredential: TokenCredential, options?: LogsClientOptions) {
    // This client defaults to using 'https://api.loganalytics.io/v1' as the
    // host.
    this._logAnalytics = new AzureLogAnalytics(tokenCredential, {
      $host: options?.host,
      credentialScopes: ["https://api.loganalytics.io/.default"]
    });
  }

  async queryLogs(
    workspaceId: string,
    query: string,
    options?: QueryLogsOptions
  ): Promise<QueryLogsResult> {
    const result = await this._logAnalytics.query.get(workspaceId, query, {
      ...options,
      requestOptions: {
        customHeaders: {
          ...formatPreferHeader(options)
        }
      }
    });

    return {
      errors: result.errors,
      tables: result.tables,
      statistics: (result["_response"].parsedBody as any)["statistics"]
    };
  }

  queryLogsBatch(body: BatchRequest, options?: QueryLogsBatchOptions): Promise<QueryBatchResponse> {
    return this._logAnalytics.query.batch(body, options);
  }

  // TODO: open question on how we're planning on exposing this endpoint.
  // getMetadata() {
  //   //this._logAnalytics.metadata.get()
  // }
}
