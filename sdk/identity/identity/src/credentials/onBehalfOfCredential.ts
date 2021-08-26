// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { OnBehalfOfCredentialOptions } from "./onBehalfOfCredentialOptions";

const logger = credentialLogger("OnBehalfOfCredential");

/**
 * Enables authentication to Azure Active Directory using the [On Behalf Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret, and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential(tenantId, clientId, clientSecret, "access-token");
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name", { authenticationOptions: { userAssertion } });
   * ```
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    private tenantId: string,
    private clientId: string,
    private clientSecret: string,
    private userAssertionToken: string,
    private options: OnBehalfOfCredentialOptions = {}
  ) {
    this.msalFlow = new MsalOnBehalfOf({
      ...this.options,
      logger,
      clientId: this.clientId,
      tenantId: this.tenantId,
      clientSecret: this.clientSecret,
      userAssertionToken: this.userAssertionToken,
      tokenCredentialOptions: this.options
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
