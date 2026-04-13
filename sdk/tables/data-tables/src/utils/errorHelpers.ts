// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import type { AzureLogger } from "@azure/logger";

// The raw OData error shape from the Azure Tables service
interface TableServiceErrorOdataError {
  code?: string;
  message?: { value?: string };
}

export type TableServiceErrorResponse = PipelineResponse & {
  /**
   * The parsed HTTP response headers.
   */
  parsedHeaders?: Record<string, unknown>;
  /**
   * The response body as parsed JSON or XML.
   */
  parsedBody: {
    "odata.error"?: TableServiceErrorOdataError;
    odataError?: TableServiceErrorOdataError;
  };
  /**
   * The request that generated the response.
   */
  request: any;
};

export function handleTableAlreadyExists(
  error: unknown,
  options: OperationOptions & { tableName?: string; logger?: AzureLogger } = {},
): void {
  if (isRestError(error) && error.statusCode === 409) {
    const responseError = getErrorResponse(error);
    const odataCode =
      responseError?.parsedBody?.["odata.error"]?.code ??
      responseError?.parsedBody?.odataError?.code ??
      error.code;
    if (odataCode === "TableAlreadyExists") {
      options.logger?.info(`Table ${options.tableName} already Exists`);

      if (options.onResponse) {
        const response = responseError ?? (error.response as TableServiceErrorResponse);
        if (response) {
          options.onResponse(response, {});
        }
      }
      return;
    }
  }
  throw error;
}

function getErrorResponse(error: RestError): TableServiceErrorResponse | undefined {
  // Try the old @azure/core-client style (parsedBody on response)
  const errorResponse: TableServiceErrorResponse = error.response as TableServiceErrorResponse;
  if (errorResponse?.parsedBody && isTableServiceErrorResponse(errorResponse.parsedBody)) {
    return errorResponse;
  }

  // Try the new @azure-rest/core-client style (bodyAsText on response)
  if (errorResponse?.bodyAsText) {
    try {
      const body = JSON.parse(errorResponse.bodyAsText);
      if (isTableServiceErrorResponse(body)) {
        return {
          ...errorResponse,
          parsedBody: body,
        } as TableServiceErrorResponse;
      }
    } catch {
      // ignore parse errors
    }
  }

  return undefined;
}

function isRestError(error: unknown): error is RestError {
  return (error as RestError).name === "RestError";
}

function isTableServiceErrorResponse(errorResponseBody: any): boolean {
  return Boolean(errorResponseBody?.["odata.error"] || errorResponseBody?.odataError);
}
