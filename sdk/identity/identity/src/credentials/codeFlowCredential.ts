// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import { TokenCredential, GetTokenOptions, AccessToken, delay } from "@azure/core-http";
import { IdentityClientOptions, IdentityClient, TokenResponse } from "../client/identityClient";
import { AuthenticationError } from "../client/errors";

/**
 * An internal interface that contains the codeflow request.
 * This interface does not get exported from the public interface of the
 * library.
 */
export interface CodeFlowAccessTokenRequest {
  scope: string;
  redirect_uri: string;
  grant_type: string;
  client_secret: string;
  code: string;
}

export interface CodeFlowAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  id_token: string;
}

export type CodeFlowCallback = (deviceCodeDetails: CodeFlowAccessTokenResponse) => void;

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class CodeFlowCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private clientId: string;

  private userPromptCallback: CodeFlowCallback;
  private lastTokenResponse: TokenResponse | null = null;

  /**
   * Creates an instance of CodeFlowCredential with the details needed
   * to initiate the codeflow authorization flow with Azure Active Directory.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param userPromptCallback A callback function that will be invoked to show
                               {@link DeviceCodeDetails} to the user.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    userPromptCallback: CodeFlowCallback,
    private redirectUri: string,
    private clientSecret: string,
    private grantType: string,
    private code: string,
    options?: IdentityClientOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.userPromptCallback = userPromptCallback;
  }

  private async sendCodeFlowRequest(
    request: CodeFlowAccessTokenRequest,
    options?: GetTokenOptions
  ): Promise<CodeFlowAccessTokenResponse> {
    const webResource = this.identityClient.createWebResource({
      url: `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/token`,
      method: "POST",
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      body: qs.stringify({
        client_id: this.clientId,
        scope: request.scope,
        code: request.code,
        redirect_uri: request.redirect_uri,
        grant_type: request.grant_type,
        client_secret: request.client_secret
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      abortSignal: options && options.abortSignal
    });

    const response = await this.identityClient.sendRequest(webResource);
    if (!(response.status === 200 || response.status === 201)) {
      throw new AuthenticationError(response.status, response.bodyAsText);
    }

    return response.parsedBody as CodeFlowAccessTokenResponse;
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
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
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
        options
      );
    }

    if (tokenResponse === null) {
      const codeFlowResponse = await this.sendCodeFlowRequest({
        "scope": scopeString,
        "redirect_uri": this.redirectUri,
        "client_secret": this.clientSecret,
        "code": this.code,
        "grant_type": this.grantType}, options);

      this.userPromptCallback(codeFlowResponse);
    }

    this.lastTokenResponse = tokenResponse;
    return (tokenResponse && tokenResponse.accessToken) || null;
  }
}
