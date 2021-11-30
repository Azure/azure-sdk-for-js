// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalClientSecret } from "../msal/nodeFlows/msalClientSecret";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { ClientSecretCredentialOptions } from "./clientSecretCredentialOptions";

const logger = credentialLogger("ClientSecretCredential");

/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration. More information on how
 * to configure a client secret can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export class ClientSecretCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options: ClientSecretCredentialOptions = {}
  ) {
    if (!tenantId || !clientId || !clientSecret) {
      throw new Error(
        "ClientSecretCredential: tenantId, clientId, and clientSecret are required parameters. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot."
      );
    }
    this.msalFlow = new MsalClientSecret({
      ...options,
      logger,
      clientId,
      tenantId,
      clientSecret,
      tokenCredentialOptions: options
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
