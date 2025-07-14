// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions, RequestParameters } from "./common.js";

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
  return tspOperationOptionsToRequestParameters(
    options as TspOperationOptions,
  ) as RequestParameters;
}
