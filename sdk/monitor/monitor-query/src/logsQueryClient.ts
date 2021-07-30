// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";
import { PipelineOptions, bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

import {
  QueryLogsBatch,
  QueryLogsBatchOptions,
  QueryLogsBatchResult,
  QueryLogsOptions,
  QueryLogsResult
} from "./models/publicLogsModels";

import {
  convertGeneratedTable,
  convertRequestForQueryBatch,
  convertResponseForQueryBatch
} from "./internal/modelConverters";
import { formatPreferHeader } from "./internal/util";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

const defaultMonitorScope = "https://api.loganalytics.io/.default";

/**
 * Options for the LogsQueryClient.
 */
export interface LogsQueryClientOptions extends PipelineOptions {
  /**
   * The host to connect to.
   */
  endpoint?: string;

  /**
   * The authentication scopes to use when getting authentication tokens.
   *
   * Defaults to 'https://api.loganalytics.io/.default'
   */
  scopes?: string | string[];
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
    // This client defaults to using 'https://api.loganalytics.io/v1' as the
    // host.

    this._logAnalytics = new AzureLogAnalytics({
      ...options,
      $host: options?.endpoint,
      endpoint: options?.endpoint
    });
    const scope = options?.scopes ?? defaultMonitorScope;
    this._logAnalytics.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({ scopes: scope, credential: tokenCredential })
    );
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
    const { flatResponse, rawResponse } = await getRawResponse(
      (paramOptions) =>
        this._logAnalytics.query.execute(
          workspaceId,
          {
            query,
            timespan
          },
          paramOptions
        ),
      {
        ...options,
        requestOptions: {
          customHeaders: {
            ...formatPreferHeader(options)
          }
        }
      }
    );

    const parsedBody = JSON.parse(rawResponse.bodyAsText!);
    flatResponse.tables = parsedBody.tables;
    return {
      tables: flatResponse.tables.map(convertGeneratedTable),
      statistics: flatResponse.statistics,
      visualization: flatResponse.render
    };
  }

  /**
   * Query logs with multiple queries, in a batch.
   * @param batch - A batch of queries to run. Each query can be configured to run against separate workspaces.
   * @param options - Options for querying logs in a batch.
   * @returns The log query results for all the queries.
   */
  async queryLogsBatch(
    batch: QueryLogsBatch,
    options?: QueryLogsBatchOptions
  ): Promise<QueryLogsBatchResult> {
    const generatedRequest = convertRequestForQueryBatch(batch);
    const { flatResponse, rawResponse } = await getRawResponse(
      (paramOptions) => this._logAnalytics.query.batch(generatedRequest, paramOptions),
      options || {}
    );
    return convertResponseForQueryBatch(flatResponse, rawResponse);
  }
}

interface ReturnType<T> {
  flatResponse: T;
  rawResponse: FullOperationResponse;
}

async function getRawResponse<TOptions extends OperationOptions, TResult>(
  f: (options: TOptions) => Promise<TResult>,
  options: TOptions
): Promise<ReturnType<TResult>> {
  // renaming onResponse received from customer to customerProvidedCallback
  const { onResponse: customerProvidedCallback } = options || {};
  let rawResponse: FullOperationResponse | undefined = undefined;
  // flatResponseParam - is basically the flatResponse received from service call -
  // just named it so that linter doesn't complain
  // onResponse - includes the rawResponse and the customer's provided onResponse
  const flatResponse = await f({
    ...options,
    onResponse: (response: FullOperationResponse, flatResponseParam: unknown) => {
      rawResponse = response;
      customerProvidedCallback?.(response, flatResponseParam);
    }
  });
  return { flatResponse, rawResponse: rawResponse! };
}
