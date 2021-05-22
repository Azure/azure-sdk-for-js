// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogAnalytics } from "./generated/logquery/src/azureLogAnalytics";
import { TokenCredential } from "@azure/core-auth";
import {
  BatchRequest,
  LogQueryRequest,
  LogQueryResponse,
  QueryBatchResponse,
  QueryBody
} from "./generated/logquery/src";
import {
  BatchQuery,
  QueryLogsBatch,
  QueryLogsBatchOptions,
  QueryLogsBatchResponse,
  QueryLogsOptions,
  QueryLogsResult
} from "./models/logsModels";
import { formatPreferHeader } from "./internal/util";
import {
  PipelineOptions,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  RequestPolicyFactory
} from "@azure/core-http";
import { demoApiKeyAuthenticationPolicy } from "./internal/demoApiKeyAuthenticationPolicy";

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
  private _isDemoClient: boolean;

  /**
   * Construct a LogsClient that can be used to query logs using the Log Analytics Query language.
   *
   * @param tokenCredential - A token credential or "DEMO_KEY", which can be used with the
   * DEMO_WORKSPACE described at https://dev.loganalytics.io/
   * @param options - Options for the LogsClient.
   */
  constructor(tokenCredential: TokenCredential | "DEMO_KEY", options?: LogsClientOptions) {
    let authPolicy: RequestPolicyFactory;

    if (typeof tokenCredential === "string") {
      if (tokenCredential !== "DEMO_KEY") {
        throw new TypeError(
          "tokenCredential must be of type string (with value DEMO_KEY) or TokenCredential"
        );
      }

      // Azure Monitor has a public demo server that you can connect to. It uses api-key authentication which we allow for
      // this particular case.
      authPolicy = demoApiKeyAuthenticationPolicy();
      this._isDemoClient = true;
    } else {
      authPolicy = bearerTokenAuthenticationPolicy(tokenCredential, defaultMonitorScope);
      this._isDemoClient = false;
    }

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
    if (this._isDemoClient && workspaceId !== "DEMO_WORKSPACE") {
      throw new Error(
        "This client was initialized with the DEMO_KEY and can only be used with a workspace ID of DEMO_WORKSPACE"
      );
    }

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
      errors: result.errors,
      tables: result.tables,
      statistics: (result["_response"].parsedBody as any)["statistics"]
    };
  }

  async queryLogsBatch(
    batch: QueryLogsBatch,
    options?: QueryLogsBatchOptions
  ): Promise<QueryLogsBatchResponse> {
    const generatedRequest = convertToBatchRequest(batch);

    for (const query of batch.queries) {
      if (this._isDemoClient && query.workspace !== "DEMO_WORKSPACE") {
        throw new Error(
          "This client was initialized with the DEMO_KEY, which does not support batch querying"
        );
      }
    }

    const response = await this._logAnalytics.query.batch(generatedRequest, options);
    return convertBatchResponse(response);
  }
}

/**
 * @internal
 */
export function convertToBatchRequest(batch: QueryLogsBatch): BatchRequest {
  let id = 0;

  const requests: LogQueryRequest[] = batch.queries.map((query: BatchQuery) => {
    const body: QueryBody &
      Partial<
        Pick<BatchQuery, "includeQueryStatistics" | "serverTimeoutInSeconds" | "workspace">
      > = { ...query };
    delete body["workspace"];
    delete body["serverTimeoutInSeconds"];
    delete body["includeQueryStatistics"];

    const logQueryRequest: LogQueryRequest = {
      id: id.toString(),
      workspace: query.workspace,
      headers: formatPreferHeader(query),
      body
    };

    ++id;

    return logQueryRequest;
  });

  return {
    requests
  };
}

/**
 * @internal
 * @hidden
 */
export function convertBatchResponse(arg: QueryBatchResponse): QueryLogsBatchResponse {
  const newResponse: QueryLogsBatchResponse = {
    results: arg.responses
      ?.sort((a, b) => {
        let left = 0;
        if (a.id != null) {
          left = parseInt(a.id, 10);
        }

        let right = 0;
        if (b.id != null) {
          right = parseInt(b.id, 10);
        }

        return left - right;
      })
      ?.map((response: LogQueryResponse) => ({
        id: response.id,
        status: response.status,
        errors: response.body?.errors,
        tables: response.body?.tables
      }))
  };

  return newResponse;
}
