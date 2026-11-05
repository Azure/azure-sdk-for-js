// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FullOperationResponse,
  OperationOptions as CoreClientOperationOptions,
} from "@azure/core-client";
import type {
  OperationOptions as RestOperationOptions,
  OperationRequestOptions as RestOperationRequestOptions,
  PathUncheckedResponse,
} from "@azure-rest/core-client";
import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * Converts an {@link CoreClientOperationOptions} from `@azure/core-client` into the
 * {@link RestOperationOptions} shape expected by the generated `@azure-rest/core-client`
 * based operations.
 *
 * The two `OperationOptions` interfaces look similar but are not structurally compatible:
 * - `requestOptions.customHeaders` (core-client) is merged into canonical
 *   `requestOptions.headers` (rest) case-insensitively so generated operations that read headers
 *   directly still receive legacy custom headers. Canonical `headers` take precedence over the
 *   deprecated alias.
 * - `serializerOptions` and `requestOptions.shouldDeserialize` (core-client only) have no rest
 *   equivalent and are intentionally dropped.
 *
 * Using this adapter instead of an `as any` cast preserves type safety and ensures options are
 * forwarded correctly at runtime.
 *
 * @internal
 */
export function toRestOperationOptions(
  options: CoreClientOperationOptions = {},
): RestOperationOptions {
  const { onResponse, requestOptions, ...others } = options;

  const restOptions: RestOperationOptions = {
    ...others,
  } as RestOperationOptions;

  if (onResponse !== undefined) {
    // The user supplied an `@azure/core-client` onResponse callback. The generated rest layer
    // invokes onResponse with a rest `FullOperationResponse`. Both `FullOperationResponse`
    // interfaces extend the same `PipelineResponse` from `@azure/core-rest-pipeline`, so the rest
    // response is structurally assignable to the core-client `FullOperationResponse` and its
    // `headers` is already an `HttpHeaders` instance. Forward it through a typed bridge rather than
    // relying on the caller's `as any` cast.
    restOptions.onResponse = (rawResponse, error, __legacyError) => {
      onResponse(rawResponse as FullOperationResponse, error, __legacyError);
    };
  }

  if (requestOptions !== undefined) {
    // The public core-client type only exposes customHeaders, but callers can pass the canonical
    // rest header bag at runtime. Accept it without widening the rest of requestOptions.
    const {
      customHeaders,
      headers,
      timeout,
      onUploadProgress,
      onDownloadProgress,
      allowInsecureConnection,
    } = requestOptions as typeof requestOptions & Pick<RestOperationRequestOptions, "headers">;
    const mergedHeaders = mergeHeaders(customHeaders, headers);

    restOptions.requestOptions = {
      ...(customHeaders !== undefined ? { customHeaders } : {}),
      ...(mergedHeaders !== undefined ? { headers: mergedHeaders } : {}),
      ...(timeout !== undefined ? { timeout } : {}),
      ...(onUploadProgress !== undefined ? { onUploadProgress } : {}),
      ...(onDownloadProgress !== undefined ? { onDownloadProgress } : {}),
      ...(allowInsecureConnection !== undefined ? { allowInsecureConnection } : {}),
    };
  }

  return restOptions;
}

function mergeHeaders(
  customHeaders?: { [key: string]: string },
  headers?: RawHttpHeadersInput,
): RawHttpHeadersInput | undefined {
  if (customHeaders === undefined && headers === undefined) {
    return undefined;
  }

  const merged = new Map<string, string | number | boolean>();
  for (const headerSet of [customHeaders, headers]) {
    for (const [name, value] of Object.entries(headerSet ?? {})) {
      merged.set(name.toLowerCase(), value);
    }
  }

  return Object.fromEntries(merged);
}

/**
 * Converts a {@link PathUncheckedResponse} produced by the `@azure-rest/core-client` based
 * operations into a {@link FullOperationResponse} as expected by the `@azure/core-client`
 * {@link CoreClientOperationOptions.onResponse} callback.
 *
 * The two response shapes differ in their `headers` representation: the rest response exposes
 * `headers` as a plain `RawHttpHeaders` record, whereas the core-client `FullOperationResponse`
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
