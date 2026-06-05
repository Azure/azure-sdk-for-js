// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
// This is used for skipping tests for features not available on staging accounts used in signoff pipelines
export const skipTestForSignOff: boolean = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";

// True when running against an account whose only gateway is the Compute Gateway (CGW), e.g. the
// signoff PPE staging account. Set this to skip tests that assert Routing/Regional Gateway-specific
// behavior (such as the 401 HMAC-mismatch responses for trailing-whitespace / percent-encoded ids
// in `test/public/functional/item/itemIdEncoding.spec.ts`), since those tests will hit CGW and see
// CGW behavior instead.
export const skipTestForRoutingGateway: boolean = process.env.SKIP_ROUTING_GATEWAY_TESTS === "true";
