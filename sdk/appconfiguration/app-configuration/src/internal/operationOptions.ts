// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions as RestOperationOptions } from "@azure-rest/core-client";
import type { OperationOptions } from "../operationOptions.js";

/** @internal */
export type RestCompatibleOperationOptions<Options extends OperationOptions> = Omit<
  Options,
  keyof OperationOptions
> &
  RestOperationOptions;

/** @internal */
export function toRestOperationOptions<Options extends OperationOptions>(
  options: Options,
): RestCompatibleOperationOptions<Options> {
  if (options.serializerOptions !== undefined) {
    throw new Error(
      "serializerOptions is not supported by the TypeSpec-generated App Configuration client.",
    );
  }
  if (options.requestOptions?.shouldDeserialize !== undefined) {
    throw new Error(
      "requestOptions.shouldDeserialize is not supported by the TypeSpec-generated App Configuration client.",
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
  } as RestCompatibleOperationOptions<Options>;
}
