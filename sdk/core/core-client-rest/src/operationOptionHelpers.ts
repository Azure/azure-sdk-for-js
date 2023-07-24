// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RequestParameters } from "./common";

/**
 * Helper function to convert OperationOptions to RequestParameters
 * @param options - the options that are used by Modular layer to send the request
 * @returns the result of the conversion in RequestParameters of RLC layer
 */
export function operationOptionsToRequestParameters(options: OperationOptions): RequestParameters {
  return {
    allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
    timeout: options.requestOptions?.timeout,
    skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
    abortSignal: options.abortSignal,
    onUploadProgress: options.requestOptions?.onUploadProgress,
    onDownloadProgress: options.requestOptions?.onDownloadProgress,
    tracingOptions: options.tracingOptions,
    headers: { ...options.requestOptions?.headers },
    onResponse: options.onResponse,
  };
}
