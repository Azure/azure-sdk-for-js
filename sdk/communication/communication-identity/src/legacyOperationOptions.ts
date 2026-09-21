// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FullOperationResponse,
  OperationOptions as GeneratedOperationOptions,
  OperationRequestOptions as GeneratedRequestOptions,
} from "@azure-rest/core-client";
import type { OperationOptions, OperationRequestOptions } from "@azure/core-client";
import { isRestError, RestError } from "@azure/core-rest-pipeline";

type CompatibleRequestOptions = OperationRequestOptions &
  GeneratedRequestOptions & {
    customHeaders?: Record<string, string>;
  };

export async function withLegacyOperationOptions<T>(
  options: OperationOptions,
  operation: (options: GeneratedOperationOptions) => Promise<T>,
): Promise<T> {
  let response: FullOperationResponse | undefined;
  let responseError: unknown;
  const generatedOptions = convertOperationOptions(options, (value, error) => {
    response = value;
    responseError = error;
  });

  let result: T;
  try {
    result = await operation(generatedOptions);
  } catch (error) {
    if (response && responseError === undefined && !shouldDeserialize(options, response)) {
      const value = response.parsedBody as T;
      options.onResponse?.(response, value);
      return value;
    }

    const normalizedError = normalizeResponseError(error, response, responseError);
    const errorWithResponse = getErrorWithResponse(normalizedError);
    const legacyResponse = response ?? errorWithResponse?.response;
    if (legacyResponse) {
      const flatResponse = response
        ? response.parsedBody
        : (errorWithResponse?.details ?? legacyResponse.parsedBody ?? {});
      if (!response && errorWithResponse) {
        errorWithResponse.details = flatResponse;
      }
      options.onResponse?.(legacyResponse, flatResponse, responseError ?? normalizedError);
    }

    throw normalizedError;
  }

  const value = shouldDeserialize(options, response) ? result : (response?.parsedBody as T);
  if (response) {
    response.parsedBody = value as FullOperationResponse["parsedBody"];
    options.onResponse?.(response, value);
  }
  return value;
}

function getErrorWithResponse(
  error: unknown,
): { response: FullOperationResponse; details?: unknown } | undefined {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error) ||
    typeof error.response !== "object" ||
    error.response === null
  ) {
    return undefined;
  }

  return error as { response: FullOperationResponse; details?: unknown };
}

function normalizeResponseError(
  error: unknown,
  response: FullOperationResponse | undefined,
  responseError: unknown,
): unknown {
  if (!response || response.status < 400 || responseError !== undefined || isRestError(error)) {
    return error;
  }

  const details = response.parsedBody;
  const message =
    typeof details === "string"
      ? details
      : typeof details === "object" &&
          details !== null &&
          "message" in details &&
          typeof details.message === "string"
        ? details.message
        : `Unexpected status code: ${response.status}`;
  const restError = new RestError(message, {
    statusCode: response.status,
    request: response.request,
    response,
  });
  restError.details = details;
  return restError;
}

function convertOperationOptions(
  options: OperationOptions,
  captureResponse: (response: FullOperationResponse, error?: unknown) => void,
): GeneratedOperationOptions {
  const {
    customHeaders,
    shouldDeserialize: _,
    ...requestOptions
  } = (options.requestOptions as CompatibleRequestOptions | undefined) ?? {};

  return {
    ...options,
    requestOptions: {
      ...requestOptions,
      headers: {
        ...customHeaders,
        ...requestOptions.headers,
      },
    },
    onResponse(response, error, legacyError) {
      captureResponse(response, legacyError ?? error);
    },
  };
}

function shouldDeserialize(
  options: OperationOptions,
  response: FullOperationResponse | undefined,
): boolean {
  const value = options.requestOptions?.shouldDeserialize;
  return !response || (typeof value === "function" ? value(response) : value !== false);
}
