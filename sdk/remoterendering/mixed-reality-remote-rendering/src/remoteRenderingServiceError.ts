// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RemoteRenderingServiceErrorInternal } from "./generated";

/** Error object containing details about a conversion or session failure. */
export class RemoteRenderingServiceError extends Error {
  /**
   * Create a RemoteRenderingServiceError with a message and code.
   */
  constructor(message: string, code: string) {
    super(message);
    Object.setPrototypeOf(this, RemoteRenderingServiceError.prototype);
    this.code = code;
    this.name = "RemoteRenderingServiceError";
  }

  /** Error code. */
  code: string;

  /**
   * An array of details about specific errors that led to this reported error.
   */
  details?: RemoteRenderingServiceError[];

  /**
   * The target of the particular error (e.g., the name of the property in error).
   */
  target?: string;

  /**
   * An object containing more specific information than the current object about the error.
   */
  innerError?: RemoteRenderingServiceError;
}

/** Create a RemoteRenderingServiceError from a RemoteRenderingServiceErrorInternal */
export function createRemoteRenderingServiceError(
  serviceError: RemoteRenderingServiceErrorInternal,
): RemoteRenderingServiceError {
  const newError = new RemoteRenderingServiceError(serviceError.message, serviceError.code);
  newError.details = serviceError.details?.map((x) => createRemoteRenderingServiceError(x));
  newError.target = serviceError.target;
  newError.innerError =
    serviceError.innerError === undefined
      ? undefined
      : createRemoteRenderingServiceError(serviceError.innerError!);
  return newError;
}
