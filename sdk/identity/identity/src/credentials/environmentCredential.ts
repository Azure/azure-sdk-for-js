// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, isNode, GetTokenOptions } from "@azure/core-http";
import { IdentityClientOptions } from "../client/identityClient";
import { ClientSecretCredential } from "./clientSecretCredential";

/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in the following environment variables:
 * 
 * - AZURE_TENANT_ID: The Azure Active Directory tenant (directory) ID.
 * - AZURE_CLIENT_ID: The client (application) ID of an App Registration in the tenant.
 * - AZURE_CLIENT_SECRET: A client secret that was generated for the App Registration.
 * 
 * This credential ultimately uses a {@link ClientSecretCredential} to
 * perform the authentication using these details.  Please consult the
 * documentation of that class for more details.
 */
export class EnvironmentCredential implements TokenCredential {
  private _credential?: TokenCredential = undefined;
  /**
   * Creates an instance of the EnvironmentCredential class and reads
   * client secret details from environment variables.  If the expected
   * environment variables are not found at this time, the getToken method
   * will return null when invoked.
   * 
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: IdentityClientOptions) {
    if (!isNode) {
      throw "EnvironmentCredential is only supported when running in Node.js.";
    }

    const tenantId = process.env.AZURE_TENANT_ID,
      clientId = process.env.AZURE_CLIENT_ID,
      clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (tenantId && clientId && clientSecret) {
      this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);
    }
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
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    if (this._credential) {
      return this._credential.getToken(scopes, options);
    }

    return Promise.resolve(null);
  }
}
