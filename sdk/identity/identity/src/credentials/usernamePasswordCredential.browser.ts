// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { createSpan } from "../util/tracing";
import { checkTenantId } from "../util/checkTenantId";

const logger = credentialLogger("UsernamePasswordCredential");

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
   * @param tenantIdOrName - The Azure Active Directory tenant (directory) ID or name.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param username - The user account's e-mail address (user name).
   * @param password - The user account's account password
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantIdOrName: string,
    clientId: string,
    username: string,
    password: string,
    options?: TokenCredentialOptions
  ) {
    checkTenantId(logger, tenantIdOrName);

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
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, updatedOptions: newOptions } = createSpan(
      "UsernamePasswordCredential-getToken",
      options
    );
    try {
      const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
      const webResource = createPipelineRequest({
        url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
        method: "POST",
        body: qs.stringify({
          response_type: "token",
          grant_type: "password",
          client_id: this.clientId,
          username: this.username,
          password: this.password,
          scope: typeof scopes === "string" ? scopes : scopes.join(" ")
        }),
        headers: createHttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }),
        abortSignal: options && options.abortSignal,
        tracingOptions: newOptions.tracingOptions
      });

      const tokenResponse = await this.identityClient.sendTokenRequest(webResource);
      logger.getToken.info(formatSuccess(scopes));
      return (tokenResponse && tokenResponse.accessToken) || null;
    } catch (err) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message
      });
      logger.getToken.info(formatError(scopes, err));
      throw err;
    } finally {
      span.end();
    }
  }
}
