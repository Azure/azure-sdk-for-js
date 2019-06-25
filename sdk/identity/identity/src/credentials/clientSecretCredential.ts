// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration.  More information on how
 * to configure a client secret can be found here:
 * 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export class ClientSecretCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private _tenantId: string;
  private _clientId: string;
  private _clientSecret: string;

  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret.
   * 
   * @param tenantId The Azure Active Directory tenant (directory) ID.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param clientSecret A client secret that was generated for the App Registration.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options?: IdentityClientOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this._tenantId = tenantId;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
  }

  /**
   * Authenticates with Azure Active Directory and returns an {@link AccessToken} if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   * 
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return this.identityClient.authenticateClientSecret(
      this._tenantId,
      this._clientId,
      this._clientSecret,
      scopes,
      options
    );
  }
}
