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
  convertGeneratedTable,
  convertRequestForQueryBatch,
  convertResponseForQueryBatch
} from "./internal/modelConverters";
import { formatPreferHeader } from "./internal/util";

const defaultMonitorScope = "https://api.loganalytics.io/.default";

export interface LogsQueryClientOptions extends PipelineOptions {
  /**
   * The host to connect to.
   *
   * Defaults to 'https://api.loganalytics.io/v1'.
   */
  endpoint?: string;
}

/**
 * Client for Azure Log Analytics
 */
export class LogsQueryClient {
  private _logAnalytics: AzureLogAnalytics;

  /**
   * Construct a LogsClient that can be used to query logs using the Log Analytics Query language.
   *
   * @param tokenCredential - A token credential.
   * @param options - Options for the LogsClient.
   */
  constructor(tokenCredential: TokenCredential, options?: LogsQueryClientOptions) {
    const authPolicy = bearerTokenAuthenticationPolicy(tokenCredential, defaultMonitorScope);

    // This client defaults to using 'https://api.loganalytics.io/v1' as the
    // host.
    const serviceClientOptions = createPipelineFromOptions(options || {}, authPolicy);

    this._logAnalytics = new AzureLogAnalytics({
      ...serviceClientOptions,
      $host: options?.endpoint
    });
  }

  /**
   * Queries logs in a Log Analytics Workspace.
   *
   * @param workspaceId - The 'Workspace Id' for the Log Analytics Workspace
   * @param query - A Log Analytics Query
   * @param timespan - The timespan over which to query data. This is an ISO8601 time period value.  This timespan is applied in addition to any that are specified in the query expression.
   *  Some common durations can be found in the `Durations` object.
   * @param options - Options to adjust various aspects of the request.
   * @returns The result of the query.
   */
  async queryLogs(
    workspaceId: string,
    query: string,
    timespan: string,
    options?: QueryLogsOptions
  ): Promise<QueryLogsResult> {
    const result = await this._logAnalytics.query.execute(
      workspaceId,
      {
        query,
        timespan
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
      tables: result.tables.map(convertGeneratedTable),
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
