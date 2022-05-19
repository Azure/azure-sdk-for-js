// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./msalNodeCommon";

/**
 * Options that can be passed to configure MSAL to handle client assertions.
 * @internal
 */
export interface MSALClientAssertionOptions extends MsalNodeOptions {
  /**
   * A function that retrieves the assertion for the credential to use.
   */
   getAssertion: () => Promise<string>;
}

/**
 * MSAL client assertion client. Calls to MSAL's confidential application's `acquireTokenByClientCredential` during `doGetToken`.
 * @internal
 */
export class MsalClientAssertion extends MsalNode {
  private getAssertion: () => Promise<string>;
  constructor(options: MSALClientAssertionOptions) {
    super(options);
    this.requiresConfidential = true;
    this.getAssertion = options.getAssertion;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.confidentialApp!.acquireTokenByClientCredential({
        scopes,
        correlationId: options.correlationId,
        azureRegion: this.azureRegion,
        authority: options.authority,
        claims: options.claims,
        clientAssertion: {
          assertion: await this.getAssertion(),
          assertionType: "jwt_bearer"
        }
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }
}
