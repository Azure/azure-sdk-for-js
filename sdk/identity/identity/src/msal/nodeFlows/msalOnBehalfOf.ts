// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";

import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";

/**
 * Options that can be passed to configure MSAL to handle On-Behalf-Of authentication requests.
 * @internal
 */
export interface MSALOnBehalfOfOptions extends MsalNodeOptions {
  clientSecret: string;
}

/**
 * MSAL on behalf of flow. Calls to MSAL's confidential application's `acquireTokenOnBehalfOf` during `doGetToken`.
 * @internal
 */
export class MsalOnBehalfOf extends MsalNode {
  constructor(options: MSALOnBehalfOfOptions) {
    super(options);
    this.logger.info("Initialized MSAL's On-Behalf-Of flow");
    this.requiresConfidential = true;
    this.msalConfig.auth.clientSecret = options.clientSecret;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    const oboAssertion = options.authenticationOptions?.userAssertion?.accessToken;
    if (!oboAssertion) {
      throw new Error(
        "The On-Behalf-Of authentication flow requires a user assertion that can be passed through the GetTokenOptions, as: `getToken(scope, { authenticationOptions: { userAssertion: createUserAssertion('accessToken') } })`."
      );
    }
    try {
      const result = await this.confidentialApp!.acquireTokenOnBehalfOf({
        scopes,
        correlationId: options.correlationId,
        authority: options.authority,
        oboAssertion
      });
      return {
        ...this.handleResult(scopes, this.clientId, result || undefined),
        refreshOnTimestamp: Date.now()
      };
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }
}
