// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationOptions as RestOperationOptions,
  PathUncheckedResponse,
} from "@azure-rest/core-client";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { FullOperationResponse, OperationOptions } from "../operationOptions.js";

/**
 * Normalizes deprecated operation option aliases before passing options to generated operations.
 *
 * @internal
 */
export function toRestOperationOptions(options: OperationOptions = {}): RestOperationOptions {
  if (options.serializerOptions !== undefined) {
    throw new Error(
      "serializerOptions is not supported by the TypeSpec-generated Data Tables client.",
    );
  }
  if (options.requestOptions?.shouldDeserialize !== undefined) {
    throw new Error(
      "requestOptions.shouldDeserialize is not supported by the TypeSpec-generated Data Tables client.",
    );
  }

  const {
    onResponse,
    requestOptions,
    serializerOptions: _serializerOptions,
    ...restOptions
  } = options;
  const {
    customHeaders,
    headers,
    shouldDeserialize: _shouldDeserialize,
    ...restRequestOptions
  } = requestOptions ?? {};

  return {
    ...restOptions,
    ...(onResponse
      ? {
          onResponse(rawResponse, error, legacyError): void {
            onResponse(rawResponse, undefined, legacyError ?? error);
          },
        }
      : {}),
    ...(requestOptions
      ? {
          requestOptions: {
            ...restRequestOptions,
            headers: {
              ...customHeaders,
              ...headers,
            },
          },
        }
      : {}),
  };
}

/**
 * Converts a {@link PathUncheckedResponse} produced by the `@azure-rest/core-client` based
 * operations into a {@link FullOperationResponse} for an operation callback.
 *
 * The two response shapes differ in their `headers` representation: the rest response exposes
 * `headers` as a plain `RawHttpHeaders` record, whereas the callback `FullOperationResponse`
 * exposes `headers` as an `HttpHeaders` instance. Forwarding the raw record with an `as any` cast
 * would cause a user `onResponse` callback that calls methods such as `headers.get(...)` to throw
 * at runtime. This adapter wraps the raw headers in a real `HttpHeaders` instance to avoid that.
 *
 * @param response - The rest response to convert.
 * @param status - Optional numeric status code override (the rest response exposes `status` as a string).
 * @internal
 */
export function toFullOperationResponse(
  response: PathUncheckedResponse,
  status?: number,
): FullOperationResponse {
  return {
    request: response.request,
    status: status ?? Number(response.status),
    headers: createHttpHeaders(response.headers),
    parsedBody: response.body,
  };
}
