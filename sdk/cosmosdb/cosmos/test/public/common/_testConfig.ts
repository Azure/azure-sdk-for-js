// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// [SuppressMessage("Microsoft.Security", "CS002:SecretInNextLine")]
const masterKey =
  process.env.ACCOUNT_KEY ||
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
const endpoint = process.env.ACCOUNT_HOST || "https://localhost:8081";
const userSasTokenKey =
  "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";

// This is needed to disable SSL verification for the tests running against emulator.
if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export { masterKey, endpoint, userSasTokenKey };
