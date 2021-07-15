// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Simple type of the raw response.
 */
export interface RawResponse {
  /** The HTTP status code */
  statusCode: number;
  /** A HttpHeaders collection in the response represented as a simple JSON object where all header names have been normalized to be lower-case. */
  headers: {
    [headerName: string]: string;
  };
  /** The parsed response body */
  body?: unknown;
}
