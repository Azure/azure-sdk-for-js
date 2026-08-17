// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions, OperationRequestOptions } from "@azure-rest/core-client";

/** @internal */
export function normalizeOperationOptions<Options extends OperationOptions>(
  options: Options,
): Options {
  const requestOptions = options.requestOptions as
    (OperationRequestOptions & { customHeaders?: Record<string, string> }) | undefined;
  if (!requestOptions?.customHeaders) {
    return options;
  }

  return {
    ...options,
    requestOptions: {
      ...requestOptions,
      headers: {
        ...requestOptions.customHeaders,
        ...requestOptions.headers,
      },
    },
  };
}
