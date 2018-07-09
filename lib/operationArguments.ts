// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestOptionsBase, TransferProgressEvent, AbortSignalLike } from "./webResource";

/**
 * A collection of properties that apply to a single invocation of an operation.
 */
export interface OperationArguments {
  /**
   * The arguments that were passed to the operation method.
   */
  arguments: { [parameterName: string]: any };

  /**
   * Headers that will be applied to this operation's HTTP request after the operation method's
   * header arguments are added.
   */
  customHeaders?: { [headerName: string]: string };

  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Callback which fires upon upload progress. Only used in the browser.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback which fires upon download progress. Only used in the browser.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Assigns the properties of a RequestOptions object to an OperationArguments object.
 * @param args the arguments object to use in the OperatonArguments
 * @param options the RequestOptions to apply
 * @return an OperationArguments object
 */
export function createOperationArguments(args: { [parameterName: string]: any }, options?: RequestOptionsBase): OperationArguments {
  return {
    arguments: args,
    customHeaders: options && options.customHeaders,
    abortSignal: options && options.abortSignal,
    onUploadProgress: options && options.onUploadProgress,
    onDownloadProgress: options && options.onDownloadProgress,
  };
}
