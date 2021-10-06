// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// [SuppressMessage("Microsoft.Security", "CS002:SecretInNextLine")]
export const masterKey =
  process.env.ACCOUNT_KEY ||
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
export const userSasTokenKey =
  "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";
