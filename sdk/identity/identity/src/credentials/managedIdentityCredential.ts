// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient } from "../client/identityClient";

/**
 * Attempts authentication using a managed identity that has been assigned
 * to the deployment environment.  This authentication type works in Azure VMs,
 * App Service and Azure Functions applications, and inside of Azure Cloud Shell.
 * 
 * More information about configuring managed identities can be found here:
 * 
 * https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private _clientId: string | undefined;

  constructor(clientId?: string, options?: IdentityClientOptions) {
    this.identityClient = new IdentityClient(options);
    this._clientId = clientId;
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
    return this.identityClient.authenticateManagedIdentity(scopes, this._clientId, options);
  }
}
