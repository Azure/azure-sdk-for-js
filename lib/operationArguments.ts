// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
  abortSignal?: AbortSignal;
}