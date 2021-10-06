// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";

import {
  QueryBatch,
  LogsQueryBatchOptions,
  LogsQueryBatchResult,
  LogsQueryOptions,
  LogsQueryResult,
  AggregateBatchError,
  BatchError,
  ErrorInfo
} from "./models/publicLogsModels";

import {
  convertGeneratedTable,
  convertRequestForQueryBatch,
  convertResponseForQueryBatch,
  mapError
} from "./internal/modelConverters";
import { formatPreferHeader } from "./internal/util";
import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { TimeInterval } from "./models/timeInterval";
import { convertTimespanToInterval } from "./timespanConversion";

const defaultMonitorScope = "https://api.loganalytics.io/.default";

/**
 * Options for the LogsQueryClient.
 */
export interface LogsQueryClientOptions extends CommonClientOptions {
  /**
   * The host to connect to.
   */
  endpoint?: string;

  /**
   * The authentication scopes to use when getting authentication tokens.
   *
   * Defaults to 'https://api.loganalytics.io/.default'
   */
  credentialOptions?: {
    credentialScopes?: string | string[];
  };
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
      endpoint: options?.endpoint,
      credentialScopes: options?.credentialOptions?.credentialScopes ?? defaultMonitorScope,
      credential: tokenCredential
    });
    // const scope = options?.scopes ?? defaultMonitorScope;
    // this._logAnalytics.pipeline.addPolicy(
    //   bearerTokenAuthenticationPolicy({ scopes: scope, credential: tokenCredential })
    // );
  }

  /**
   * Queries logs in a Log Analytics Workspace.
   *
   * @param workspaceId - The 'Workspace Id' for the Log Analytics Workspace
   * @param query - A Kusto query.
   * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
   *  Some common durations can be found in the `Durations` object.
   * @param options - Options to adjust various aspects of the request.
   * @returns The result of the query.
   */
  async query(
    workspaceId: string,
    query: string,
    timespan: TimeInterval,
    options?: LogsQueryOptions
  ): Promise<LogsQueryResult> {
    let timeInterval: string = "";
    if (timespan) {
      timeInterval = convertTimespanToInterval(timespan);
    }
    const { flatResponse, rawResponse } = await getRawResponse(
      (paramOptions) =>
        this._logAnalytics.query.execute(
          workspaceId,
          {
            query,
            timespan: timeInterval,
            workspaces: options?.additionalWorkspaces
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
    const result: LogsQueryResult = {
      tables: flatResponse.tables.map(convertGeneratedTable),
      statistics: flatResponse.statistics,
      visualization: flatResponse.render,
      error: mapError(flatResponse.error),
      status: "Success" // Assume success until shown otherwise.
    };
    if (!result.error) {
      // if there is no error field, it is success
      result.status = "Success";
    } else {
      // result.tables is always present in single query response, even is there is error
      if (result.tables.length === 0) {
        result.status = "Failed";
      } else {
        result.status = "Partial";
      }
    }
    if (options?.throwOnAnyFailure && result.status !== "Success") {
      throw new BatchError(result.error as ErrorInfo);
    }
    return result;
  }

  /**
   * Query Logs with multiple queries, in a batch.
   * @param batch - A batch of Kusto queries to execute. Each query can be configured to run against separate workspaces.
   * @param options - Options for querying logs in a batch.
   * @returns The Logs query results for all the queries.
   */
  async queryBatch(
    batch: QueryBatch[],
    options?: LogsQueryBatchOptions
  ): Promise<LogsQueryBatchResult> {
    const generatedRequest = convertRequestForQueryBatch(batch);
    const { flatResponse, rawResponse } = await getRawResponse(
      (paramOptions) => this._logAnalytics.query.batch(generatedRequest, paramOptions),
      options || {}
    );
    const result: LogsQueryBatchResult = convertResponseForQueryBatch(flatResponse, rawResponse);

    if (options?.throwOnAnyFailure && result.results.some((it) => it.status !== "Success")) {
      const errorResults = result.results
        .filter((it) => it.status !== "Success")
        .map((x) => x.error);
      const batchErrorList = errorResults.map((x) => new BatchError(x as ErrorInfo));
      throw new AggregateBatchError(batchErrorList);
    }
    return result;
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
