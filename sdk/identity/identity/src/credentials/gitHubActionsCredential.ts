// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AuthenticationError, CredentialUnavailableError } from "../errors.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";

import type { GitHubActionsCredentialOptions } from "./gitHubActionsCredentialOptions.js";
import { ClientAssertionCredential } from "./clientAssertionCredential.js";
import { IdentityClient } from "../client/identityClient.js";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { checkTenantId } from "../util/tenantIdUtils.js";
import { credentialLogger } from "../util/logging.js";
import { AzureAuthorityHosts } from "../constants.js";

const credentialName = "GitHubActionsCredential";
const logger = credentialLogger(credentialName);

/**
 * Derives the OIDC audience from the authority host for sovereign cloud support.
 * @internal
 */
export function deriveAudience(authorityHost: string): string {
  let hostname: string;
  try {
    hostname = new URL(authorityHost).hostname.toLowerCase();
  } catch {
    // If it's not a valid URL, fall back to public cloud default
    return "api://AzureADTokenExchange";
  }

  switch (hostname) {
    case "login.microsoftonline.us":
      return "api://AzureADTokenExchangeUSGov";
    case "login.chinacloudapi.cn":
      return "api://AzureADTokenExchangeChina";
    case "login.microsoftonline.com":
    default:
      return "api://AzureADTokenExchange";
  }
}

/**
 * Enables authentication to Microsoft Entra ID using GitHub Actions
 * OIDC federated identity credentials.
 *
 * This credential is designed for use in GitHub Actions workflows that have
 * `permissions: id-token: write` configured. It reads the following environment
 * variables:
 * - `AZURE_TENANT_ID` — The Entra ID tenant.
 * - `AZURE_CLIENT_ID` — The client ID of the app registration with a federated identity credential.
 * - `ACTIONS_ID_TOKEN_REQUEST_URL` — Set automatically by GitHub Actions runner.
 * - `ACTIONS_ID_TOKEN_REQUEST_TOKEN` — Set automatically by GitHub Actions runner.
 */
export class GitHubActionsCredential implements TokenCredential {
  private clientAssertionCredential: ClientAssertionCredential | undefined;
  private identityClient: IdentityClient;

  /**
   * Creates a new instance of GitHubActionsCredential.
   *
   * Reads `AZURE_TENANT_ID` and `AZURE_CLIENT_ID` from environment variables,
   * as well as GitHub Actions OIDC variables `ACTIONS_ID_TOKEN_REQUEST_URL` and
   * `ACTIONS_ID_TOKEN_REQUEST_TOKEN`.
   *
   * @param options - Options to configure the credential.
   */
  constructor(options: GitHubActionsCredentialOptions = {}) {
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;

    if (!tenantId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Set the AZURE_TENANT_ID environment variable to use this credential.`,
      );
    }
    if (!clientId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Set the AZURE_CLIENT_ID environment variable to use this credential.`,
      );
    }

    this.identityClient = new IdentityClient(options);
    checkTenantId(logger, tenantId);

    const oidcRequestUrl = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
    const oidcRequestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;

    if (!oidcRequestUrl || !oidcRequestToken) {
      const missing = [
        !oidcRequestUrl ? "ACTIONS_ID_TOKEN_REQUEST_URL" : "",
        !oidcRequestToken ? "ACTIONS_ID_TOKEN_REQUEST_TOKEN" : "",
      ]
        .filter(Boolean)
        .join(", ");
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Ensure that you're running this task in a GitHub Actions workflow with 'permissions: id-token: write' so that the following missing system variable(s) can be defined: ${missing}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/githubactionscredential/troubleshoot`,
      );
    }

    const authorityHost = options.authorityHost ?? AzureAuthorityHosts.AzurePublicCloud;
    const audience = deriveAudience(authorityHost);

    logger.info(
      `Invoking GitHubActionsCredential with tenant ID: ${tenantId}, client ID: ${clientId}, audience: ${audience}`,
    );

    this.clientAssertionCredential = new ClientAssertionCredential(
      tenantId,
      clientId,
      this.requestOidcToken.bind(this, oidcRequestUrl, oidcRequestToken, audience),
      options,
    );
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} or
   * {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    if (!this.clientAssertionCredential) {
      const errorMessage = `${credentialName}: is unavailable. To use GitHub Actions OIDC federation, the following are required: AZURE_TENANT_ID, AZURE_CLIENT_ID, ACTIONS_ID_TOKEN_REQUEST_URL, ACTIONS_ID_TOKEN_REQUEST_TOKEN. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/githubactionscredential/troubleshoot`;
      logger.error(errorMessage);
      throw new CredentialUnavailableError(errorMessage);
    }
    logger.info("Invoking getToken() of Client Assertion Credential");
    return this.clientAssertionCredential.getToken(scopes, options);
  }

  /**
   * Requests an OIDC token from the GitHub Actions OIDC provider.
   * @internal
   */
  private async requestOidcToken(
    oidcRequestUrl: string,
    oidcRequestToken: string,
    audience: string,
  ): Promise<string> {
    logger.info("Requesting OIDC token from GitHub Actions...");

    // GitHub OIDC endpoint uses GET (not POST like Azure Pipelines).
    // Audience is appended as query param; omit if empty.
    let url = oidcRequestUrl;
    if (audience) {
      url = `${oidcRequestUrl}&audience=${encodeURIComponent(audience)}`;
    }

    const request = createPipelineRequest({
      url,
      method: "GET",
      headers: createHttpHeaders({
        Authorization: `Bearer ${oidcRequestToken}`,
      }),
    });

    const response = await this.identityClient.sendRequest(request);
    return handleOidcResponse(response);
  }
}

/**
 * Parses the OIDC token response from GitHub's OIDC provider.
 * @internal
 */
export function handleOidcResponse(response: PipelineResponse): string {
  const text = response.bodyAsText;
  if (!text) {
    logger.error(
      `${credentialName}: Authentication Failed. Received null token from OIDC request. Status code: ${response.status}.`,
    );
    throw new AuthenticationError(response.status, {
      error: `${credentialName}: Authentication Failed. Received null token from OIDC request.`,
      error_description: `Status code: ${response.status}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/githubactionscredential/troubleshoot`,
    });
  }

  try {
    const result = JSON.parse(text);
    if (result?.value) {
      return result.value;
    } else {
      const errorMessage = `${credentialName}: Authentication Failed. "value" field not detected in the response.`;
      let errorDescription = "";
      if (response.status !== 200) {
        errorDescription = `Response body = ${text}. Status code: ${response.status}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/githubactionscredential/troubleshoot`;
      }
      logger.error(errorMessage);
      logger.error(errorDescription);
      throw new AuthenticationError(response.status, {
        error: errorMessage,
        error_description: errorDescription,
      });
    }
  } catch (e: any) {
    if (e instanceof AuthenticationError) throw e;
    const errorDetails = `${credentialName}: Authentication Failed. Failed to parse OIDC response. Response = ${text}. Error: ${e.message}`;
    logger.error(errorDetails);
    throw new AuthenticationError(response.status, {
      error: errorDetails,
      error_description: `See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/githubactionscredential/troubleshoot`,
    });
  }
}
