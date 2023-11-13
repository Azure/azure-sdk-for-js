// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const endpoint = process.env.ACCOUNT_HOST || "https://127.0.0.1:8081";
// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://127.0.0.1")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
