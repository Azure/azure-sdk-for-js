// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { credentialLogger } from "../util/logging";
import { MsalUsernamePassword } from "../msal/nodeFlows/msalUsernamePassword";
import { MsalFlow } from "../msal/flows";
import { trace } from "../util/tracing";
import { UsernamePasswordCredentialOptions } from "./usernamePasswordCredentialOptions";

const logger = credentialLogger("UsernamePasswordCredential");

/**
 * Enables authentication to Azure Active Directory with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
export class UsernamePasswordCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the UsernamePasswordCredential with the details
   * needed to authenticate against Azure Active Directory with a username
   * and password.
   *
   * @param tenantId - The Azure Active Directory tenant (directory).
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param username - The user account's e-mail address (user name).
   * @param password - The user account's account password
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    username: string,
    password: string,
    options: UsernamePasswordCredentialOptions = {}
  ) {
    if (!tenantId || !clientId || !username || !password) {
      throw new Error(
        "UsernamePasswordCredential: tenantId, clientId, username and password are required parameters."
      );
    }
    this.msalFlow = new MsalUsernamePassword({
      ...options,
      logger,
      clientId,
      tenantId,
      username,
      password,
      tokenCredentialOptions: options || {}
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * If the user provided the option `disableAutomaticAuthentication`,
   * once the token can't be retrieved silently,
   * this method won't attempt to request user interaction to retrieve the token.
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
