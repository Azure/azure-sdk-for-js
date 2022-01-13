// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ClientTokenResponseOutput {
  /** The token value for the WebSocket client to connect to the service */
  token?: string;
}

export interface ErrorDetailOutput {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: Array<ErrorDetailOutput>;
  inner?: InnerErrorOutput;
}

export interface InnerErrorOutput {
  /** A more specific error code than was provided by the containing error. */
  code?: string;
  inner?: InnerErrorOutput;
}
