// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";

/**
 * Enables authentication to Azure Active Directory with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
export class UsernamePasswordCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private clientId: string;
  private username: string;
  private password: string;

  /**
   * Creates an instance of the UsernamePasswordCredential with the details
   * needed to authenticate against Azure Active Directory with a username
   * and password.
   *
   * @param tenantIdOrName The Azure Active Directory tenant (directory) ID or name.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param username The user account's e-mail address (user name).
   * @param password The user account's account password
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantIdOrName: string,
    clientId: string,
    username: string,
    password: string,
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantIdOrName;
    this.clientId = clientId;
    this.username = username;
    this.password = password;
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
      "UsernamePasswordCredential-getToken",
      options
    );
    try {
      const webResource = this.identityClient.createWebResource({
        url: `${this.identityClient.authorityHost}/${this.tenantId}/oauth2/v2.0/token`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify({
          response_type: "token",
          grant_type: "password",
          client_id: this.clientId,
          username: this.username,
          password: this.password,
          scope: typeof scopes === "string" ? scopes : scopes.join(" ")
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        abortSignal: options && options.abortSignal,
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
      });

      const tokenResponse = await this.identityClient.sendTokenRequest(webResource);
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
