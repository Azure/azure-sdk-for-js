// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential } from "@azure/core-http";

const BrowserNotSupportedError = new Error(
  "EnvironmentCredential is not supported in the browser."
);

export class EnvironmentCredential implements TokenCredential {
  constructor() {
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
