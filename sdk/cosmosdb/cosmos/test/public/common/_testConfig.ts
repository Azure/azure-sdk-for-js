// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
// Set to `true` in the signoff pipeline. Skips tests that depend on features or environments
// unavailable in the signoff staging account: the local emulator (sslVerification), partition-key
// delete (container, clientSideEncryption), ChangeFeed AllVersionsAndDeletes (changeFeedIterator),
// and Routing Gateway failure-mode assertions (itemIdEncoding RGW_* tests).
export const skipTestForSignOff: boolean = process.env.SKIP_TESTS_FOR_SIGN_OFF === "true";
