// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const BrowserNotSupportedError = new Error(
  "getAuthorityHostEnvironment is not supported in the browser.",
);

export function getAuthorityHostEnvironment(): { authorityHost: string } | undefined {
  throw BrowserNotSupportedError;
}
