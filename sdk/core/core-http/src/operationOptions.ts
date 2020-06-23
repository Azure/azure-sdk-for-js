// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { OperationTracingOptions } from "@azure/core-tracing";
import { TransferProgressEvent, RequestOptionsBase } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";

/**
 * The base options type for all operations.
 */
export interface OperationOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options used when creating and sending HTTP requests for this operation.
   */
  requestOptions?: OperationRequestOptions;
  /**
   * Options used when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;
}

export interface OperationRequestOptions {
  /**
   * @property {object} [customHeaders] User defined custom request headers that
   * will be applied before the request is sent.
   */
  customHeaders?: { [key: string]: string };

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   */
  timeout?: number;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback which fires upon download progress.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
   * HttpOperationResponse should be deserialized.
   */
  shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
}

/**
 * Converts an OperationOptions to a RequestOptionsBase
 *
 * @param opts OperationOptions object to convert to RequestOptionsBase
 */
export function operationOptionsToRequestOptionsBase<T extends OperationOptions>(
  opts: T
): RequestOptionsBase {
  const { requestOptions, tracingOptions, ...additionalOptions } = opts;

  let result: RequestOptionsBase = additionalOptions;

  if (requestOptions) {
    result = { ...result, ...requestOptions };
  }

  if (tracingOptions) {
    result.spanOptions = tracingOptions.spanOptions;
  }

  return result;
}
