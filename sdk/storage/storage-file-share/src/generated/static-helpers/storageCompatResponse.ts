// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FullOperationResponse, RawResponseCallback } from "@azure-rest/core-client";

/**
 * Response metadata providing access to raw HTTP response details.
 * Available when the `enable-storage-compat` emitter option is enabled.
 */
export interface StorageCompatResponseInfo<TBody = unknown, THeaders = Record<string, unknown>> {
  _response: {
    /** The raw FullOperationResponse from the HTTP pipeline. */
    rawResponse: FullOperationResponse;
    /** The deserialized response body. */
    parsedBody: TBody;
    /** The deserialized response headers. */
    parsedHeaders: THeaders;
  };
}

/**
 * Creates an onResponse callback that captures the raw FullOperationResponse.
 * Chains with any existing user-provided onResponse callback.
 * @param originalOnResponse - The user's original onResponse callback, if any.
 * @returns An object with the onResponse callback and a getter for the captured response.
 */
export function createStorageCompatOnResponse(originalOnResponse?: RawResponseCallback): {
  onResponse: RawResponseCallback;
  getRawResponse: () => FullOperationResponse | undefined;
} {
  let captured: FullOperationResponse | undefined;
  return {
    onResponse: (rawResponse: FullOperationResponse, error?: unknown) => {
      captured = rawResponse;
      originalOnResponse?.(rawResponse, error);
    },
    getRawResponse: () => captured,
  };
}

/**
 * Computes the return type for addStorageCompatResponse:
 * - When TBody is undefined/void/null, returns THeaders & StorageCompatResponseInfo
 * - Otherwise returns THeaders & TBody & StorageCompatResponseInfo
 *
 * Headers and body properties are spread at the top level of the result,
 * in addition to being available under `_response.parsedHeaders` / `_response.parsedBody`.
 */
type StorageCompatResult<TBody, THeaders> = TBody extends undefined | void | null
  ? THeaders & StorageCompatResponseInfo<TBody, THeaders>
  : THeaders & TBody & StorageCompatResponseInfo<TBody, THeaders>;

/**
 * Augments a deserialized response with raw HTTP response metadata.
 * @param rawResponse - The raw FullOperationResponse from the HTTP pipeline.
 * @param parsedBody - The deserialized response body.
 * @param parsedHeaders - The deserialized response headers.
 * @returns The parsedBody augmented with a `_response` property.
 */
export function addStorageCompatResponse<TBody, THeaders = Record<string, unknown>>(
  rawResponse: FullOperationResponse,
  parsedBody: TBody,
  parsedHeaders: THeaders,
): StorageCompatResult<TBody, THeaders> {
  const base = parsedBody !== undefined && parsedBody !== null ? parsedBody : ({} as TBody);
  return Object.assign(base as any, parsedHeaders, {
    _response: {
      rawResponse,
      parsedBody,
      parsedHeaders,
    },
  });
}
