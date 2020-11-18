// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse, PipelineOptions } from "@azure/core-http";

export {
  SparkJobListViewResponse,
  SqlQueryStringDataModel,
  MonitoringGetSqlJobQueryStringOptionalParams as GetSqlJobQueryStringOptions,
  MonitoringGetSparkJobListOptionalParams as GetSparkJobListOptions,
  SparkJob
} from "./generated/models";

/**
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T extends object> = T & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: T;
  };
};

/**
 * Options to create spark client.
 */
export interface MonitoringClientOptions extends PipelineOptions {}

// /**
//  * Arguments for retrieving the next page of search results.
//  */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

// /**
//  * Represents the repsonse for operations
//  */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}
