// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions as CoreClientOperationOptions } from "@azure/core-client";
import type { OperationOptions as RestOperationOptions } from "@azure-rest/core-client";

/**
 * Converts an {@link CoreClientOperationOptions} from `@azure/core-client` into the
 * {@link RestOperationOptions} shape expected by the generated `@azure-rest/core-client`
 * based operations.
 *
 * The two `OperationOptions` interfaces look similar but are not structurally compatible:
 * - `requestOptions.customHeaders` (core-client) must be mapped to `requestOptions.headers` (rest),
 *   otherwise user-provided headers are silently dropped at request time.
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
  const { abortSignal, tracingOptions, onResponse, requestOptions } = options;

  const restOptions: RestOperationOptions = {};

  if (abortSignal !== undefined) {
    restOptions.abortSignal = abortSignal;
  }

  if (tracingOptions !== undefined) {
    restOptions.tracingOptions = tracingOptions;
  }

  if (onResponse !== undefined) {
    // The FullOperationResponse parameter types differ between the two packages but both
    // extend PipelineResponse, so the callback is forwarded as-is.
    restOptions.onResponse = onResponse as RestOperationOptions["onResponse"];
  }

  if (requestOptions !== undefined) {
    const {
      customHeaders,
      timeout,
      onUploadProgress,
      onDownloadProgress,
      allowInsecureConnection,
    } = requestOptions;

    restOptions.requestOptions = {
      ...(customHeaders !== undefined ? { headers: customHeaders } : {}),
      ...(timeout !== undefined ? { timeout } : {}),
      ...(onUploadProgress !== undefined ? { onUploadProgress } : {}),
      ...(onDownloadProgress !== undefined ? { onDownloadProgress } : {}),
      ...(allowInsecureConnection !== undefined ? { allowInsecureConnection } : {}),
    };
  }

  return restOptions;
}
