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
    headers: {
      ...compatibilityOptions.requestOptions?.customHeaders,
      ...tspRequestParameters.headers,
    },
    tracingOptions: options.tracingOptions,
  };
}
