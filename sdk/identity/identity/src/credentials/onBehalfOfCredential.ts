// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential, UserAssertion } from "@azure/core-auth";

import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { OnBehalfOfCredentialOptions } from "./onBehalfOfCredentialOptions";

const logger = credentialLogger("OnBehalfOfCredential");

/**
 * Enables authentication to Azure Active Directory using the On Behalf Of flow.:
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow
 */
export class OnBehalfOfCredential implements TokenCredential {
  private msalFlows: WeakMap<UserAssertion, MsalFlow>;

  /**
   * Creates an instance of the OnBehalfOfCredential with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret, and an user assertion.
   *
   * The user assertion needs to be sent through the `getToken` method.
   * Azure SDK clients will be able to specify the user assertion through
   * the `authenticationOptions` in the optional parameters of the SDK client methods.
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
    private options: OnBehalfOfCredentialOptions = {}
  ) {
    this.msalFlows = new WeakMap();
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * The Azure SDK clients that support TokenCredentials will allow passing an `authenticationOptions` object
   * through the optional parameters of their methods. There, the user assertion can be passed, as follows:
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential(tenantId, clientId, clientSecret);
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * const userAssertions = createUserAssertion("access-token");
   * await client.getKey("key-name", { authenticationOptions: { userAssertion } });
   * ```
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    const userAssertion = options.authenticationOptions?.userAssertion;
    if (!userAssertion?.accessToken) {
      throw new Error(`To authenticate with OnBehalfOfCredential, a valid user assertion must be sent through the Azure SDK client's method.
For example, using the KeyClient from @azure/keyvault-keys:

    const tokenCredential = new OnBehalfOfCredential(tenantId, clientId, clientSecret);
    const client = new KeyClient("vault-url", tokenCredential);
    const userAssertions = createUserAssertion("access-token");
    await client.getKey("key-name", { authenticationOptions: { userAssertion } });
`);
    }

    if (!this.msalFlows.has(userAssertion)) {
      this.msalFlows.set(
        userAssertion,
        new MsalOnBehalfOf({
          ...this.options,
          logger,
          clientId: this.clientId,
          tenantId: this.tenantId,
          clientSecret: this.clientSecret,
          tokenCredentialOptions: this.options
        })
      );
    }

    const msalFlow = this.msalFlows.get(userAssertion)!;

    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
