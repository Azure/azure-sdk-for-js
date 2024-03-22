// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  checkTenantId,
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { credentialLogger, formatSuccess } from "../util/logging";
import { IdentityClient } from "../client/identityClient";
import { UsernamePasswordCredentialOptions } from "./usernamePasswordCredentialOptions";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("UsernamePasswordCredential");

/**
 * Enables authentication to Microsoft Entra ID with a user's
 * username and password. This credential requires a high degree of
 * trust so you should only use it when other, more secure credential
 * types can't be used.
 */
export class UsernamePasswordCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private clientId: string;
  private username: string;
  private password: string;

  /**
   * Creates an instance of the UsernamePasswordCredential with the details
   * needed to authenticate against Microsoft Entra ID with a username
   * and password.
   *
   * @param tenantIdOrName - The Microsoft Entra tenant (directory) ID or name.
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
    options?: UsernamePasswordCredentialOptions
  ) {
    checkTenantId(logger, tenantIdOrName);

    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantIdOrName;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );
    this.clientId = clientId;
    this.username = username;
    this.password = password;
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if
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
      "UsernamePasswordCredential.getToken",
      options,
      async (newOptions) => {
        const tenantId = processMultiTenantRequest(
          this.tenantId,
          newOptions,
          this.additionallyAllowedTenantIds
        );
        newOptions.tenantId = tenantId;

        const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
        const params = new URLSearchParams({
          response_type: "token",
          grant_type: "password",
          client_id: this.clientId,
          username: this.username,
          password: this.password,
          scope: typeof scopes === "string" ? scopes : scopes.join(" "),
        });
        const webResource = createPipelineRequest({
          url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
          method: "POST",
          body: params.toString(),
          headers: createHttpHeaders({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          abortSignal: options && options.abortSignal,
          tracingOptions: newOptions.tracingOptions,
        });

        const tokenResponse = await this.identityClient.sendTokenRequest(webResource);
        logger.getToken.info(formatSuccess(scopes));
        return (tokenResponse && tokenResponse.accessToken) || null;
      }
    );
  }
}
