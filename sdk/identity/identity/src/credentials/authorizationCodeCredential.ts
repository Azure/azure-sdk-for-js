// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClient, TokenResponse, TokenCredentialOptions } from "../client/identityClient";
import { CanonicalCode } from "@opentelemetry/types";

/**
 * Enables authentication to Azure Active Directory using an authorization code
 * that was obtained through the authorization code flow, described in more detail
 * in the Azure Active Directory documentation:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 */
export class AuthorizationCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private clientId: string;
  private clientSecret: string | undefined;
  private authorizationCode: string;
  private redirectUri: string;

  private lastTokenResponse: TokenResponse | null = null;

  /**
   * Creates an instance of CodeFlowCredential with the details needed
   * to request an access token using an authentication that was obtained
   * from Azure Active Directory.
   *
   * It is currently necessary for the user of this credential to initiate
   * the authorization code flow to obtain an authorization code to be used
   * with this credential.  A full example of this flow is provided here:
   *
   * https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/authorizationCodeSample.ts
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name.
   *                 'common' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param clientSecret A client secret that was generated for the App Registration
   * @param authorizationCode An authorization code that was received from following the
                              authorization code flow.  This authorization code must not
                              have already been used to obtain an access token.
   * @param redirectUri The redirect URI that was used to request the authorization code.
                        Must be the same URI that is configured for the App Registration.
   * @param options Options for configuring the client which makes the access token request.
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
   * https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/authorizationCodeSample.ts
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name.
   *                 'common' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param authorizationCode An authorization code that was received from following the
                              authorization code flow.  This authorization code must not
                              have already been used to obtain an access token.
   * @param redirectUri The redirect URI that was used to request the authorization code.
                        Must be the same URI that is configured for the App Registration.
   * @param options Options for configuring the client which makes the access token request.
   */
  constructor(
    tenantId: string | "common",
    clientId: string,
    authorizationCode: string,
    redirectUri: string,
    options?: TokenCredentialOptions
  );
  /**
   * @ignore
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
    this.clientId = clientId;
    this.tenantId = tenantId;

    if (typeof redirectUriOrOptions === "string") {
      // the clientId+clientSecret constructor
      this.clientSecret = clientSecretOrAuthorizationCode;
      this.authorizationCode = authorizationCodeOrRedirectUri;
      this.redirectUri = redirectUriOrOptions;
      // options okay
    } else {
      // clientId only
      this.clientSecret = undefined;
      this.authorizationCode = clientSecretOrAuthorizationCode;
      this.redirectUri = authorizationCodeOrRedirectUri as string;
      options = redirectUriOrOptions as TokenCredentialOptions;
    }

    this.identityClient = new IdentityClient(options);
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, options: newOptions } = createSpan(
      "AuthorizationCodeCredential-getToken",
      options
    );
    try {
      let tokenResponse: TokenResponse | null = null;
      let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
      if (scopeString.indexOf("offline_access") < 0) {
        scopeString += " offline_access";
      }

      // Try to use the refresh token first
      if (this.lastTokenResponse && this.lastTokenResponse.refreshToken) {
        tokenResponse = await this.identityClient.refreshAccessToken(
          this.tenantId,
          this.clientId,
          scopeString,
          this.lastTokenResponse.refreshToken,
          this.clientSecret,
          undefined,
          newOptions
        );
      }

      if (tokenResponse === null) {
        const webResource = this.identityClient.createWebResource({
          url: `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/token`,
          method: "POST",
          disableJsonStringifyOnBody: true,
          deserializationMapper: undefined,
          body: qs.stringify({
            client_id: this.clientId,
            grant_type: "authorization_code",
            scope: scopeString,
            code: this.authorizationCode,
            redirect_uri: this.redirectUri,
            client_secret: this.clientSecret
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          abortSignal: options && options.abortSignal,
          spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
        });

        tokenResponse = await this.identityClient.sendTokenRequest(webResource);
      }

      this.lastTokenResponse = tokenResponse;
      return (tokenResponse && tokenResponse.accessToken) || null;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }
}
