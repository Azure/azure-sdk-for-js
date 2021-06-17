// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetSparkJobListParameters,
  GetSqlJobQueryStringParameters
} from "./parameters";
import {
  GetSparkJobList200Response,
  GetSqlJobQueryString200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface GetSparkJobList {
  /** Get list of spark applications for the workspace. */
  get(options?: GetSparkJobListParameters): Promise<GetSparkJobList200Response>;
}

export interface GetSqlJobQueryString {
  /** Get SQL OD/DW Query for the workspace. */
  get(
    options?: GetSqlJobQueryStringParameters
  ): Promise<GetSqlJobQueryString200Response>;
}

export interface Routes {
  /** Resource for '/monitoring/workloadTypes/spark/Applications' has methods for the following verbs: get */
  (path: "/monitoring/workloadTypes/spark/Applications"): GetSparkJobList;
  /** Resource for '/monitoring/workloadTypes/sql/querystring' has methods for the following verbs: get */
  (path: "/monitoring/workloadTypes/sql/querystring"): GetSqlJobQueryString;
}

export type MonitoringClientRestClient = Client & {
  path: Routes;
};

export default function MonitoringClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): MonitoringClientRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2019-11-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as MonitoringClientRestClient;
}
