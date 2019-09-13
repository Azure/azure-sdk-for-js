// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { InteractiveBrowserCredentialOptions } from "./interactiveBrowserCredentialOptions";

const BrowserNotSupportedError = new Error(
  "InteractiveBrowserCredential is not supported in Node.js."
);

/**
 * Enables authentication to Azure Active Directory inside of the web browser
 * using the interactive login flow, either via browser redirects or a popup
 * window.  This credential is not currently supported in Node.js.
 */
export class InteractiveBrowserCredential implements TokenCredential {
  constructor(tenantId: string, clientId: string, options?: InteractiveBrowserCredentialOptions) {
    throw BrowserNotSupportedError;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
