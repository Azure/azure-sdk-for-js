// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
// `true` in the signoff pipeline: skips tests needing features/environments absent from the
// signoff staging account (emulator, partition-key delete, ChangeFeed AllVersionsAndDeletes, RGW_* tests).
export const skipTestForSignOff: boolean = process.env.SKIP_TESTS_FOR_SIGN_OFF === "true";
