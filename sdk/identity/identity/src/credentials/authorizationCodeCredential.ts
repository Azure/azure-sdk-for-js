// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { credentialLogger } from "../util/logging";
import { checkTenantId } from "../util/checkTenantId";
import { MsalAuthorizationCode } from "../msal/nodeFlows/msalAuthorizationCode";
import { MsalFlow } from "../msal/flows";
import { trace } from "../util/tracing";

const logger = credentialLogger("AuthorizationCodeCredential");

/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export class AuthorizationCodeCredential implements TokenCredential {
  private msalFlow: MsalFlow;
  private disableAutomaticAuthentication?: boolean;
  private authorizationCode: string;
  private redirectUri: string;

  /**
   * Creates an instance of CodeFlowCredential with the details needed
   * to request an access token using an authentication that was obtained
   * from Azure Active Directory.
   *
   * It is currently necessary for the user of this credential to initiate
   * the authorization code flow to obtain an authorization code to be used
   * with this credential.  A full example of this flow is provided here:
   *
   * https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/manual/authorizationCodeSample.ts
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
   *                 'common' may be used when dealing with multi-tenant scenarios.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration
   * @param authorizationCode - An authorization code that was received from following the
                              authorization code flow.  This authorization code must not
                              have already been used to obtain an access token.
   * @param redirectUri - The redirect URI that was used to request the authorization code.
                        Must be the same URI that is configured for the App Registration.
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecret: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  );
  /**
   * Creates an instance of CodeFlowCredential with the details needed
   * to request an access token using an authentication that was obtained
   * from Azure Active Directory.
   *
   * It is currently necessary for the user of this credential to initiate
   * the authorization code flow to obtain an authorization code to be used
   * with this credential.  A full example of this flow is provided here:
   *
   * https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/manual/authorizationCodeSample.ts
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
   *                 'common' may be used when dealing with multi-tenant scenarios.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param authorizationCode - An authorization code that was received from following the
                              authorization code flow.  This authorization code must not
                              have already been used to obtain an access token.
   * @param redirectUri - The redirect URI that was used to request the authorization code.
                        Must be the same URI that is configured for the App Registration.
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(
    tenantId: string | "common",
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  );
  /**
   * @hidden
   * @internal
   */
  constructor(
    tenantId: string | "common",
    clientId: string,
    clientSecretOrAuthorizationCode: string,
    authorizationCodeOrRedirectUri: string,
    redirectUriOrOptions: string | TokenCredentialOptions | undefined,
    options?: TokenCredentialOptions
  ) {
    checkTenantId(logger, tenantId);
    let clientSecret: string | undefined = clientSecretOrAuthorizationCode;

    if (typeof redirectUriOrOptions === "string") {
      // the clientId+clientSecret constructor
      this.authorizationCode = authorizationCodeOrRedirectUri;
      this.redirectUri = redirectUriOrOptions;
      // in this case, options are good as they come
    } else {
      // clientId only
      this.authorizationCode = clientSecretOrAuthorizationCode;
      this.redirectUri = authorizationCodeOrRedirectUri as string;
      clientSecret = undefined;
      options = redirectUriOrOptions as TokenCredentialOptions;
    }

    this.msalFlow = new MsalAuthorizationCode({
      ...options,
      clientSecret,
      clientId,
      tokenCredentialOptions: options || {},
      logger,
      redirectUri: this.redirectUri,
      authorizationCode: this.authorizationCode
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
      return this.msalFlow.getToken(arrayScopes, {
        ...newOptions,
        disableAutomaticAuthentication: this.disableAutomaticAuthentication
      });
    });
  }
}
