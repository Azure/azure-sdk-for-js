// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * String URLs used when calling to `fetch()`.
 */
export type CommonRequestInfo = string;

/**
 * An object containing information about the outgoing HTTP request.
 */
export type CommonRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body?: any;
  headers?: any;
  signal?: any;
};

/**
 * An object containing information about the incoming HTTP response.
 */
export type CommonResponse = Omit<Response, "body" | "trailer" | "formData"> & {
  body: any;
  trailer: any;
  formData: any;
};
