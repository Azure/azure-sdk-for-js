// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The Analytics query. Learn more about the
 * [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
 */
export interface QueryBody {
  /** The query to execute. */
  query: string;
  /**
   * Optional. The timespan over which to query data. This is an ISO8601 time period
   * value.  This timespan is applied in addition to any that are specified in the
   * query expression.
   */
  timespan?: string;
  /** A list of workspaces to query in addition to the primary workspace. */
  workspaces?: string[];
}

export function queryBodySerializer(item: QueryBody): any {
  return {
    query: item["query"],
    timespan: item["timespan"],
    workspaces: !item["workspaces"]
      ? item["workspaces"]
      : item["workspaces"].map((p: any) => {
          return p;
        }),
  };
}

/** Contains the tables, columns & rows resulting from a query. */
export interface QueryResults {
  /** The results of the query in tabular format. */
  tables: Table[];
  /** Statistics represented in JSON format. */
  statistics?: Record<string, any>;
  /** Visualization data in JSON format. */
  render?: Record<string, any>;
  /** The code and message for an error. */
  error?: ErrorInfo;
}

export function queryResultsDeserializer(item: any): QueryResults {
  return {
    tables: tableArrayDeserializer(item["tables"]),
    statistics: item["statistics"],
    render: item["render"],
    error: !item["error"]
      ? item["error"]
      : errorInfoDeserializer(item["error"]),
  };
}

export function tableArrayDeserializer(result: Array<Table>): any[] {
  return result.map((item) => {
    return tableDeserializer(item);
  });
}

/** Contains the columns and rows for one table in a query response. */
export interface Table {
  /** The name of the table. */
  name: string;
  /** The list of columns in this table. */
  columns: Column[];
  /** The resulting rows from this query. */
  rows: any[][];
}

export function tableDeserializer(item: any): Table {
  return {
    name: item["name"],
    columns: columnArrayDeserializer(item["columns"]),
    rows: item["rows"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
  };
}

export function columnArrayDeserializer(result: Array<Column>): any[] {
  return result.map((item) => {
    return columnDeserializer(item);
  });
}

/** A column in a table. */
export interface Column {
  /** The name of this column. */
  name: string;
  /** The data type of this column. */
  type: ColumnDataType;
}

export function columnDeserializer(item: any): Column {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The data type of a column. */
export type ColumnDataType =
  | "bool"
  | "datetime"
  | "dynamic"
  | "int"
  | "long"
  | "real"
  | "string"
  | "guid"
  | "decimal"
  | "timespan";

/** The code and message for an error. */
export interface ErrorInfo {
  /** A machine readable error code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** error details. */
  details?: ErrorDetail[];
  /** Inner error details if they exist. */
  innererror?: ErrorInfo;
  /** Additional properties that can be provided on the error info object */
  additionalProperties?: Record<string, any>;
}

export function errorInfoDeserializer(item: any): ErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : errorDetailArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : errorInfoDeserializer(item["innererror"]),
    additionalProperties: item["additionalProperties"],
  };
}

export function errorDetailArrayDeserializer(
  result: Array<ErrorDetail>,
): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** Error details. */
export interface ErrorDetail {
  /** The error's code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** Indicates which property in the request is responsible for the error. */
  target?: string;
  /** Indicates which value in 'target' is responsible for the error. */
  value?: string;
  /** Indicates resources which were responsible for the error. */
  resources?: string[];
  /** Additional properties that can be provided on the error details object */
  additionalProperties?: Record<string, any>;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    value: item["value"],
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    additionalProperties: item["additionalProperties"],
  };
}

/** Contains details when the response code indicates an error. */
export interface ErrorResponse {
  /** The error details. */
  error: ErrorInfo;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: errorInfoDeserializer(item["error"]),
  };
}

/** An array of requests. */
export interface BatchRequest {
  /** An single request in a batch. */
  requests: BatchQueryRequest[];
}

export function batchRequestSerializer(item: BatchRequest): any {
  return { requests: batchQueryRequestArraySerializer(item["requests"]) };
}

export function batchQueryRequestArraySerializer(
  result: Array<BatchQueryRequest>,
): any[] {
  return result.map((item) => {
    return batchQueryRequestSerializer(item);
  });
}

/** A single request in a batch. */
export interface BatchQueryRequest {
  /** Unique ID corresponding to each request in the batch. */
  id: string;
  /**
   * Headers of the request. Can use prefer header to set server timeout and to
   * query statistics and visualization information.
   */
  headers?: Record<string, string>;
  /**
   * The Analytics query. Learn more about the
   * [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
   */
  body: QueryBody;
  /** The path for the batch query request. */
  path: "/query";
  /** The method of a single request in a batch. */
  method: "POST";
  /**
   * Primary Workspace ID of the query. This is the Workspace ID from the Properties
   * blade in the Azure portal.
   */
  workspace: string;
}

export function batchQueryRequestSerializer(item: BatchQueryRequest): any {
  return {
    id: item["id"],
    headers: item["headers"],
    body: queryBodySerializer(item["body"]),
    path: item["path"],
    method: item["method"],
    workspace: item["workspace"],
  };
}

/** Response to a batch query. */
export interface BatchResponse {
  /** An array of responses corresponding to each individual request in a batch. */
  responses?: BatchQueryResponse[];
}

export function batchResponseDeserializer(item: any): BatchResponse {
  return {
    responses: !item["responses"]
      ? item["responses"]
      : batchQueryResponseArrayDeserializer(item["responses"]),
  };
}

export function batchQueryResponseArrayDeserializer(
  result: Array<BatchQueryResponse>,
): any[] {
  return result.map((item) => {
    return batchQueryResponseDeserializer(item);
  });
}

/** Contains the batch query response and the headers, id, and status of the request */
export interface BatchQueryResponse {
  /** Unique ID corresponding to each request in the batch. */
  id?: string;
  /** The HTTP status code of the response. */
  status?: number;
  /** Contains the tables, columns & rows resulting from a query. */
  body?: BatchQueryResults;
  /** Dictionary of <string> */
  headers?: Record<string, string>;
}

export function batchQueryResponseDeserializer(item: any): BatchQueryResponse {
  return {
    id: item["id"],
    status: item["status"],
    body: !item["body"]
      ? item["body"]
      : batchQueryResultsDeserializer(item["body"]),
    headers: item["headers"],
  };
}

/** Contains the tables, columns & rows resulting from a query. */
export interface BatchQueryResults {
  /** The results of the query in tabular format. */
  tables?: Table[];
  /** Statistics represented in JSON format. */
  statistics?: Record<string, any>;
  /** Visualization data in JSON format. */
  render?: Record<string, any>;
  /** The code and message for an error. */
  error?: ErrorInfo;
}

export function batchQueryResultsDeserializer(item: any): BatchQueryResults {
  return {
    tables: !item["tables"]
      ? item["tables"]
      : tableArrayDeserializer(item["tables"]),
    statistics: item["statistics"],
    render: item["render"],
    error: !item["error"]
      ? item["error"]
      : errorInfoDeserializer(item["error"]),
  };
}

/** Service API versions */
export type Versions = "v1";
