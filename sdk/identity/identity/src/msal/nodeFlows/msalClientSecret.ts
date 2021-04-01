// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-http";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";

/**
 * Options that can be passed to configure MSAL to handle client secrets.
 * @internal
 */
export interface MSALClientSecretOptions extends MsalNodeOptions {
  clientSecret: string;
}

/**
 * MSAL client secret client. Calls to MSAL's confidential application's `acquireTokenByClientCredential` during `doGetToken`.
 * @internal
 */
export class MsalClientSecret extends MsalNode {
  constructor(options: MSALClientSecretOptions) {
    super(options);
    this.requiresConfidential = true;
    this.msalConfig.auth.clientSecret = options.clientSecret;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.confidentialApp!.acquireTokenByClientCredential({
        scopes,
        correlationId: options.correlationId
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }
}
