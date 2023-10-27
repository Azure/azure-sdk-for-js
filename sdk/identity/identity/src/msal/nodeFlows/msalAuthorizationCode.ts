// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";
import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { credentialLogger } from "../../util/logging";

/**
 * Options that can be passed to configure MSAL to handle authentication through opening a browser window.
 * @internal
 */
export interface MsalAuthorizationCodeOptions extends MsalNodeOptions {
  redirectUri: string;
  authorizationCode: string;
  clientSecret?: string;
}

/**
 * This MSAL client sets up a web server to listen for redirect callbacks, then calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`
 * to trigger the authentication flow, and then respond based on the values obtained from the redirect callback
 * @internal
 */
export class MsalAuthorizationCode extends MsalNode {
  private redirectUri: string;
  private authorizationCode: string;

  constructor(options: MsalAuthorizationCodeOptions) {
    super(options);
    this.logger = credentialLogger("Node.js MSAL Authorization Code");
    this.redirectUri = options.redirectUri;
    this.authorizationCode = options.authorizationCode;
    if (options.clientSecret) {
      this.msalConfig.auth.clientSecret = options.clientSecret;
    }
  }

  async getAuthCodeUrl(options: {
    scopes: string[];
    redirectUri: string;
    enableCae?: boolean;
  }): Promise<string> {
    await this.init();
    return this.getApp("confidentialFirst", options.enableCae).getAuthCodeUrl({
      scopes: options.scopes,
      redirectUri: options.redirectUri,
    });
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    try {
      const result = await this.getApp("confidentialFirst", options?.enableCae).acquireTokenByCode({
        scopes,
        redirectUri: this.redirectUri,
        code: this.authorizationCode,
        correlationId: options?.correlationId,
        authority: options?.authority,
        claims: options?.claims,
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err: any) {
      throw this.handleError(scopes, err, options);
    }
  }
}
