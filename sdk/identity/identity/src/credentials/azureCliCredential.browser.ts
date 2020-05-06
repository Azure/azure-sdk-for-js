// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { AccessToken, TokenCredential } from "@azure/core-http";

const BrowserNotSupportedError = new Error("AzureCliCredential is not supported in the browser.");

export class AzureCliCredential implements TokenCredential {
  constructor() {
    throw BrowserNotSupportedError;
  }

  getToken(): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
