// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";

import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { handleMsalError } from "../utils";
import { isError } from "@azure/core-util";

/**
 * Options that can be passed to configure MSAL to handle client assertions.
 * @internal
 */
export interface MsalClientAssertionOptions extends MsalNodeOptions {
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
  getAssertion: () => Promise<string>;
  constructor(options: MsalClientAssertionOptions) {
    super(options);
    this.requiresConfidential = true;
    this.getAssertion = options.getAssertion;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.getApp(
        "confidential",
        options.enableCae
      ).acquireTokenByClientCredential({
        scopes,
        correlationId: options.correlationId,
        azureRegion: this.azureRegion,
        authority: options.authority,
        claims: options.claims,
        clientAssertion: this.getAssertion,
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, result || undefined);
    } catch (err: unknown) {
      let err2 = err;
      if (err === null || err === undefined) {
        err2 = new Error(JSON.stringify(err));
      } else {
        err2 = isError(err) ? err : new Error(String(err));
      }
      throw handleMsalError(scopes, err2 as Error, options);
    }
  }
}
