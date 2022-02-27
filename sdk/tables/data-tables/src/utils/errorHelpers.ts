// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, OperationRequest } from "@azure/core-client";
import { PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import { AzureLogger } from "@azure/logger";
import { TableServiceError } from "../generated";

export type TableServiceErrorResponse = PipelineResponse & {
  /**
   * The parsed HTTP response headers.
   */
  parsedHeaders?: Record<string, unknown>;
  /**
   * The response body as parsed JSON or XML.
   */
  parsedBody: TableServiceError;
  /**
   * The request that generated the response.
   */
  request: OperationRequest;
};

export function handleTableAlreadyExists(
  error: unknown,
  options: OperationOptions & { tableName?: string; logger?: AzureLogger } = {}
): void {
  const responseError = getErrorResponse(error);
  if (
    responseError &&
    responseError.status === 409 &&
    responseError.parsedBody.odataError?.code === "TableAlreadyExists"
  ) {
    options.logger?.info(`Table ${options.tableName} already Exists`);

    if (options.onResponse) {
      options.onResponse(responseError, {});
    }
  } else {
    throw error;
  }
}

function getErrorResponse(error: unknown): TableServiceErrorResponse | undefined {
  if (!isRestError(error)) {
    return undefined;
  }

  const errorResponse: TableServiceErrorResponse = error.response as TableServiceErrorResponse;

  if (!errorResponse || !isTableServiceErrorResponse(errorResponse.parsedBody)) {
    return undefined;
  }

  return errorResponse;
}

function isRestError(error: unknown): error is RestError {
  return (error as RestError).name === "RestError";
}

function isTableServiceErrorResponse(
  errorResponseBody: any
): errorResponseBody is TableServiceError {
  return Boolean(errorResponseBody?.odataError);
}
