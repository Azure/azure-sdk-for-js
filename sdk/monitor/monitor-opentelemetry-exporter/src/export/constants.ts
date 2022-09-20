// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export const STATSBEAT_LANGUAGE = "node";

export const RedirectStatusCodes = [
  307, // Temporary redirect
  308 // Permanent redirect
];

export const RetryableStatusCodes = [
  206, // Partial success
  401, // Unauthorized
  403, // Forbidden
  408, // Request timeout
  429, // Too many requests
  500, // Internal service error
  502, // Bad gateway
  503, // Service unavailable
  504 // Gateway timeout
];

export const throttleStatusCodes = [
  402, // Too many requests over extended time
  439 // Too many requests over extended time (legacy)
];

export const StatsbeatResourceProvider = {
  appsvc: "appsvc",
  functions: "functions",
  vm: "vm",
  unknown: "unknown"
}
