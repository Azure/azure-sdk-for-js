// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, AccessToken } from "@azure/core-http";

const BrowserNotSupportedError = new Error("VSCodeCredential is not supported in the browser.");

export class VSCodeCredential implements TokenCredential {
  constructor() {
    throw BrowserNotSupportedError;
  }

  public getToken(): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
