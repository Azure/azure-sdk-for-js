// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";
import { credentialLogger } from "../../util/logging";
import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import open from "open";

/**
 * Options that can be passed to configure MSAL to handle authentication through opening a browser window.
 * @internal
 */
export interface MsalOpenBrowserOptions extends MsalNodeOptions {
  redirectUri?: string;
  loginHint?: string;
  browserCustomizationOptions?: {
    errorMessage?: string;
    successMessage?: string;
  };
}

/**
 * A call to open(), but mockable
 * @internal
 */
export const interactiveBrowserMockable = {
  open,
};

/**
 * This MSAL client sets up a web server to listen for redirect callbacks, then calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`
 * to trigger the authentication flow, and then respond based on the values obtained from the redirect callback
 * @internal
 */
export class MsalOpenBrowser extends MsalNode {
  private loginHint?: string;
  private errorTemplate?: string;
  private successTemplate?: string;

  constructor(options: MsalOpenBrowserOptions) {
    super(options);
    this.loginHint = options.loginHint;
    this.errorTemplate = options.browserCustomizationOptions?.errorMessage;
    this.successTemplate = options.browserCustomizationOptions?.successMessage;
    this.logger = credentialLogger("Node.js MSAL Open Browser");
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    try {
      const result = await this.getApp("public", options?.enableCae).acquireTokenInteractive({
        openBrowser: async (url) => {
          await interactiveBrowserMockable.open(url, { wait: true, newInstance: true });
        },
        scopes,
        authority: options?.authority,
        claims: options?.claims,
        correlationId: options?.correlationId,
        loginHint: this.loginHint,
        errorTemplate: this.errorTemplate,
        successTemplate: this.successTemplate,
      });
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err: any) {
      throw this.handleError(scopes, err, options);
    }
  }
}
