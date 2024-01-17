// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";
import { handleMsalError, handleMsalResult } from "../utils";

import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";

/**
 * Options that can be passed to configure MSAL to handle client secrets.
 * @internal
 */
export interface MsalClientSecretOptions extends MsalNodeOptions {
  /**
   * A client secret that was generated for the App Registration.
   */
  clientSecret: string;
}

/**
 * MSAL client secret client. Calls to MSAL's confidential application's `acquireTokenByClientCredential` during `doGetToken`.
 * @internal
 */
export class MsalClientSecret extends MsalNode {
  constructor(options: MsalClientSecretOptions) {
    super(options);
    this.requiresConfidential = true;
    this.msalConfig.auth.clientSecret = options.clientSecret;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {},
  ): Promise<AccessToken> {
    try {
      const result = await this.getApp(
        "confidential",
        options.enableCae,
      ).acquireTokenByClientCredential({
        scopes,
        correlationId: options.correlationId,
        azureRegion: this.azureRegion,
        authority: options.authority,
        claims: options.claims,
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return handleMsalResult(scopes, result || undefined);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }
}
