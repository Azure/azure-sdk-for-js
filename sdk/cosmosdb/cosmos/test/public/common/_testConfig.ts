// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
// This is used for skipping tests for features not available on staging accounts used in signoff pipelines
export const skipTestForSignOff: boolean = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";
