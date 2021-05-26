// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

import {
  QueryLogsBatch,
  QueryLogsBatchOptions,
  QueryLogsBatchResponse,
  QueryLogsOptions,
  QueryLogsResult
} from "./models/publicLogsModels";

import {
  convertRequestForQueryBatch,
  convertResponseForQueryBatch
} from "./internal/modelConverters";
import { formatPreferHeader } from "./internal/util";

const defaultMonitorScope = "https://api.loganalytics.io/.default";

export interface LogsClientOptions extends PipelineOptions {
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

  /**
   * Construct a LogsClient that can be used to query logs using the Log Analytics Query language.
   *
   * @param tokenCredential - A token credential.
   * @param options - Options for the LogsClient.
   */
  constructor(tokenCredential: TokenCredential, options?: LogsClientOptions) {
    const authPolicy = bearerTokenAuthenticationPolicy(tokenCredential, defaultMonitorScope);

    // This client defaults to using 'https://api.loganalytics.io/v1' as the
    // host.
    const serviceClientOptions = createPipelineFromOptions(options || {}, authPolicy);

    // TODO: this is bit odd, but I don't see a proper way to "opt out" of passing in a credential here.
    // serviceClient.ts has an explicit check to avoid using the credential you pass if you pass in your
    // own requestPolicyFactory, as I'm doing. However, I don't see anyone else being "clever" like this.
    this._logAnalytics = new AzureLogAnalytics((null as any) as TokenCredential, {
      ...serviceClientOptions,
      $host: options?.host
    });
  }

  async queryLogs(
    workspaceId: string,
    query: string,
    options?: QueryLogsOptions
  ): Promise<QueryLogsResult> {
    const result = await this._logAnalytics.query.execute(
      workspaceId,
      {
        query,
        timespan: options?.timespan
      },
      {
        requestOptions: {
          customHeaders: {
            ...formatPreferHeader(options)
          }
        }
      }
    );

    return {
      tables: result.tables,
      statistics: result.statistics
    };
  }

  async queryLogsBatch(
    batch: QueryLogsBatch,
    options?: QueryLogsBatchOptions
  ): Promise<QueryLogsBatchResponse> {
    const generatedRequest = convertRequestForQueryBatch(batch);
    const response = await this._logAnalytics.query.batch(generatedRequest, options);
    return convertResponseForQueryBatch(response);
  }
}
