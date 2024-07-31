// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";

import {
  LogsQueryBatchOptions,
  LogsQueryBatchResult,
  LogsQueryOptions,
  LogsQueryPartialResult,
  LogsQueryResult,
  LogsQueryResultStatus,
  LogsQuerySuccessfulResult,
  QueryBatch,
} from "./models/publicLogsModels";

import {
  convertGeneratedTable,
  convertRequestForQueryBatch,
  convertResponseForQueryBatch,
  mapError,
} from "./internal/modelConverters";
import { formatPreferHeader } from "./internal/util";
import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { QueryTimeInterval } from "./models/timeInterval";
import { convertTimespanToInterval } from "./timespanConversion";
import { KnownMonitorLogAudience, SDK_VERSION } from "./constants";
import { tracingClient } from "./tracing";
import { getLogQueryEndpoint } from "./internal/logQueryOptionUtils";

/**
 * Options for the LogsQueryClient.
 */
export interface LogsQueryClientOptions extends CommonClientOptions {
  /**
   * The host to connect to.
   */
  endpoint?: string;

  /**
   * The Audience to use for authentication with Microsoft Entra ID. The
   * audience is not considered when using a shared key.
   */
  audience?: string;
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
    const scope: string = options?.audience
      ? `${options.audience}/.default`
      : `${KnownMonitorLogAudience.AzurePublicCloud}/.default`;

    let endpoint = options?.endpoint;
    if (options?.endpoint) {
      endpoint = getLogQueryEndpoint(options);
    }
    const packageDetails = `azsdk-js-monitor-query/${SDK_VERSION}`;
    const userAgentPrefix =
      options?.userAgentOptions && options?.userAgentOptions.userAgentPrefix
        ? `${options?.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;
    this._logAnalytics = new AzureLogAnalytics({
      ...options,
      $host: endpoint,
      endpoint: endpoint,
      credentialScopes: scope,
      credential: tokenCredential,
      userAgentOptions: {
        userAgentPrefix,
      },
    });
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
  async queryWorkspace(
    workspaceId: string,
    query: string,
    timespan: QueryTimeInterval,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: LogsQueryOptions = {},
  ): Promise<LogsQueryResult> {
    let timeInterval: string = "";
    return tracingClient.withSpan(
      "LogsQueryClient.queryWorkspace",
      options,
      async (updatedOptions) => {
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
                workspaces: options?.additionalWorkspaces,
              },
              paramOptions,
            ),
          {
            ...updatedOptions,
            requestOptions: {
              customHeaders: {
                ...formatPreferHeader(options),
              },
            },
          },
        );

        const parsedBody = JSON.parse(rawResponse.bodyAsText!);
        flatResponse.tables = parsedBody.tables;

        const res = {
          tables: flatResponse.tables.map(convertGeneratedTable),
          statistics: flatResponse.statistics,
          visualization: flatResponse.render,
        };

        if (!flatResponse.error) {
          // if there is no error field, it is success
          const result: LogsQuerySuccessfulResult = {
            tables: res.tables,
            statistics: res.statistics,
            visualization: res.visualization,
            status: LogsQueryResultStatus.Success,
          };
          return result;
        } else {
          const result: LogsQueryPartialResult = {
            partialTables: res.tables,
            status: LogsQueryResultStatus.PartialFailure,
            partialError: mapError(flatResponse.error),
            statistics: res.statistics,
            visualization: res.visualization,
          };
          return result;
        }
      },
    );
  }

  /**
   * Query Logs with multiple queries, in a batch.
   * @param batch - A batch of Kusto queries to execute. Each query can be configured to run against separate workspaces.
   * @param options - Options for querying logs in a batch.
   * @returns The Logs query results for all the queries.
   */
  async queryBatch(
    batch: QueryBatch[],
    options: LogsQueryBatchOptions = {},
  ): Promise<LogsQueryBatchResult> {
    return tracingClient.withSpan("LogsQueryClient.queryBatch", options, async (updatedOptions) => {
      const generatedRequest = convertRequestForQueryBatch(batch);
      const { flatResponse, rawResponse } = await getRawResponse(
        (paramOptions) => this._logAnalytics.query.batch(generatedRequest, paramOptions),
        updatedOptions || {},
      );
      const result: LogsQueryBatchResult = convertResponseForQueryBatch(flatResponse, rawResponse);
      return result;
    });
  }

  /**
   * Executes a Kusto query on an Azure resource
   *
   * @param resourceId - The identifier of the resource. The expected format is
         '/subscriptions/<sid>/resourceGroups/<rg>/providers/<providerName>/<resourceType>/<resourceName>'.
   * @param query - A Kusto query. Learn more about the `Kusto query syntax <https://docs.microsoft.com/azure/data-explorer/kusto/query/>`.
   * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
   *  Some common durations can be found in the {@link Durations} object.
   * @param options - Options to adjust various aspects of the request.
   * @returns Returns all the Azure Monitor logs matching the given Kusto query for an Azure resource.
   */
  async queryResource(
    resourceId: string,
    query: string,
    timespan: QueryTimeInterval,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: LogsQueryOptions = {},
  ): Promise<LogsQueryResult> {
    let timeInterval: string = "";
    return tracingClient.withSpan(
      "LogsQueryClient.queryResource",
      options,
      async (updatedOptions) => {
        timeInterval = convertTimespanToInterval(timespan);
        if (resourceId.startsWith("/")) {
          resourceId = resourceId.substring(1);
        }

        const { flatResponse, rawResponse } = await getRawResponse(
          (paramOptions) =>
            this._logAnalytics.query.resourceExecute(
              resourceId,
              {
                query,
                timespan: timeInterval,
                workspaces: options?.additionalWorkspaces,
              },
              paramOptions,
            ),
          {
            ...updatedOptions,
            requestOptions: {
              customHeaders: {
                ...formatPreferHeader(options),
              },
            },
          },
        );

        const parsedBody = JSON.parse(rawResponse.bodyAsText!);
        flatResponse.tables = parsedBody.tables;

        const res = {
          tables: flatResponse.tables.map(convertGeneratedTable),
          statistics: flatResponse.statistics,
          visualization: flatResponse.render,
        };

        if (!flatResponse.error) {
          // if there is no error field, it is success
          const result: LogsQuerySuccessfulResult = {
            tables: res.tables,
            statistics: res.statistics,
            visualization: res.visualization,
            status: LogsQueryResultStatus.Success,
          };
          return result;
        } else {
          const result: LogsQueryPartialResult = {
            partialTables: res.tables,
            status: LogsQueryResultStatus.PartialFailure,
            partialError: mapError(flatResponse.error),
            statistics: res.statistics,
            visualization: res.visualization,
          };
          return result;
        }
      },
    );
  }
}

interface ReturnType<T> {
  flatResponse: T;
  rawResponse: FullOperationResponse;
}

async function getRawResponse<TOptions extends OperationOptions, TResult>(
  f: (options: TOptions) => Promise<TResult>,
  options: TOptions,
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
    },
  });
  return { flatResponse, rawResponse: rawResponse! };
}
