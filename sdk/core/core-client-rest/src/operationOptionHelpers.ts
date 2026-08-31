// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions, OperationRequestOptions, RequestParameters } from "./common.js";

import {
  operationOptionsToRequestParameters as tspOperationOptionsToRequestParameters,
  type OperationOptions as TspOperationOptions,
} from "@typespec/ts-http-runtime";

/**
 * Helper function to convert OperationOptions to RequestParameters
 * @param options - the options that are used by Modular layer to send the request
 * @returns the result of the conversion in RequestParameters of RLC layer
 */
export function operationOptionsToRequestParameters(options: OperationOptions): RequestParameters {
  const compatibilityOptions = options as OperationOptions & {
    requestOptions?: OperationRequestOptions & {
      customHeaders?: Record<string, string>;
    };
  };
  const tspRequestParameters = tspOperationOptionsToRequestParameters(
    options as TspOperationOptions,
  ) as RequestParameters;
  return {
    ...tspRequestParameters,
    headers: mergeHeaders(
      compatibilityOptions.requestOptions?.customHeaders,
      tspRequestParameters.headers,
    ),
    tracingOptions: options.tracingOptions,
  };
}

function mergeHeaders(
  ...headerSets: Array<RequestParameters["headers"]>
): NonNullable<RequestParameters["headers"]> {
  const headers = new Map<string, string | number | boolean>();
  for (const headerSet of headerSets) {
    for (const [name, value] of Object.entries(headerSet ?? {})) {
      headers.set(name.toLowerCase(), value);
    }
  }
  return Object.fromEntries(headers);
}
