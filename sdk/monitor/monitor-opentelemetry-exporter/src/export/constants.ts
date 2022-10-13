// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export const STATSBEAT_LANGUAGE = "node";

export const MAX_STATSBEAT_FAILURES = 3;

export const StatsbeatResourceProvider = {
  appsvc: "appsvc",
  functions: "functions",
  vm: "vm",
  unknown: "unknown",
};

export enum StatsbeatCounter {
  SUCCESS_COUNT = "Request Success Count",
  FAILURE_COUNT = "Request Failure Count",
  RETRY_COUNT = "Retry Count",
  THROTTLE_COUNT = "Throttle Count",
  EXCEPTION_COUNT = "Exception Count",
  AVERAGE_DURATION = "Request Duration",
}
