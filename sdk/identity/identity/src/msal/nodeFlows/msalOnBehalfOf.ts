// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";

import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";

/**
 * @internal
 */
export interface MsalOnBehalfOfOptions extends MsalNodeOptions {
  clientSecret: string;
  userAssertion?: string;
}

/**
 * @internal
 */
export class MsalOnBehalfOf extends MsalNode {
  private userAssertion: string;

  constructor(options: MsalOnBehalfOfOptions) {
    super(options);
    if (!options.userAssertion) {
      throw new Error("userAssertion is required");
    }
    this.userAssertion = options.userAssertion;
    this.requiresConfidential = true;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.confidentialApp!.acquireTokenOnBehalfOf({
        scopes,
        correlationId: options.correlationId,
        authority: options.authority,
        oboAssertion: this.userAssertion
      });
      // The Client Credential flow does not return an account,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }
}
