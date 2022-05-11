// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { IdentityClient } from "../client/identityClient";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("ClientSecretCredential");

// This credential is exported on browser bundles for development purposes.
// For this credential to work in browsers, browsers would need to have security features disabled.
// Please do not disable your browser security features.

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
  private tenantId: string;
  private clientId: string;
  private clientSecret: string;

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
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    return tracingClient.withSpan(
      `${this.constructor.name}.getToken`,
      options,
      async (newOptions) => {
        const query = new URLSearchParams({
          response_type: "token",
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: typeof scopes === "string" ? scopes : scopes.join(" "),
        });

        try {
          const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
          const request = createPipelineRequest({
            url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
            method: "POST",
            body: query.toString(),
            headers: createHttpHeaders({
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            abortSignal: options && options.abortSignal,
            tracingOptions: newOptions?.tracingOptions,
          });

          const tokenResponse = await this.identityClient.sendTokenRequest(request);
          logger.getToken.info(formatSuccess(scopes));
          return (tokenResponse && tokenResponse.accessToken) || null;
        } catch (err: any) {
          logger.getToken.info(formatError(scopes, err));
          throw err;
        }
      }
    );
  }
}
