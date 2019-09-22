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

function resultPrint(result: CodeFlowAccessTokenResponse) {
  console.log("result: ", result);
}

async function main(): Promise<void> {
  let credential = new CodeFlowCredential(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "6731de76-14a6-49ae-97bc-6eba6914391e",
    resultPrint,
    "http://localhost/myapp/",
    "JqQX2PNo9bpM0uEihUPzyrh",
    "authorization_code",
    "OAQABAAIAAAAP0wLlqdLVToOpA4kwzSnx6R_sA9wG8hqPmoHgGIVjJr4Yh43ZBV8au0dUsHl5Hx1sffTdyrA-oQcjUw6RCMHBQf-7C1M7cBCuKfTNLnPifP_Z6pd3gSvTysrnYOuOnoVJwBwdktOPWhfvW153qjoHVDvpMpiuUFfT9IWWYHCXA4G9dqgTQh_cqLIwiACgrKeLjP3tTu1AEt0zPlHWllkLZhhxFUBrvDMiiIMgQyYlAhsXXEoSPKc21uECipkObrdrFgelw_gUhfQCbx21ATFiJhmk62RiD9ii84iQzChpHSe0Wrb3Nf-_vu2s5LXtOye9glRfN6gwvOMt6zyxk0SBNrT0NBWFwDAQbT3P5T0bzMEr6hKc5PCZ29pXUNv0XnKU-6_J5VfrFKKfr8ngiEbRrR92XwRuCOX2bdbU9W--TP1FqvD6iUy25pJrIU6VNJVUAg1VHCJK09oNFn8oNdA09TYNQj4wQnsAJyfb3Pe6GLRrzLIuIDLSxD2zNglG5sF2D3Amt0D31IygL1gbX9MkmZW5F-IwDtdPnxuzZhpJ6MBUgioYUMz5vclRk7uGoW0kCIm-1Wamhez25SI_iMMlhl5nNNQBQK0xiS521VjyPyfwqdPYfjUNiNyZ-9sCHIDeau5sVMMEmddue8NUfO3FoUhui8EWQeVIoclIRTnwTn0-nSAWPIlzovK_xtdBxv1A2RIOe0bnr77B8PFkbk5ZVREpoJuf4s41WIWI7FyUWgBBE3QTR6HXbway-7I_I2ztuzvtDU3ReLmwXxuS-mDTm8CllMhx1xELx9iv3ZB_xMfdx1EvXWZZq0WWw9GH4SZuEUpcBUriFoZpnSfAx9Z8TzCt0ltVCGyBYKOmKSloeCAA");

  await credential.getToken("https://graph.microsoft.com/user.read");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
