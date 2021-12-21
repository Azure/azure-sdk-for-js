// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-auth";

import { credentialLogger, processEnvVars, formatSuccess, formatError } from "../util/logging";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { ClientSecretCredential } from "./clientSecretCredential";
import { AuthenticationError, CredentialUnavailableError } from "../errors";
import { checkTenantId } from "../util/checkTenantId";
import { trace } from "../util/tracing";
import { ClientCertificateCredential } from "./clientCertificateCredential";
import { UsernamePasswordCredential } from "./usernamePasswordCredential";

/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */
export const AllSupportedEnvironmentVariables = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_CLIENT_SECRET",
  "AZURE_CLIENT_CERTIFICATE_PATH",
  "AZURE_USERNAME",
  "AZURE_PASSWORD",
];

const credentialName = "EnvironmentCredential";
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Azure Active Directory depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions extends TokenCredentialOptions {}

/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in environment variables
 */
export class EnvironmentCredential implements TokenCredential {
  private _credential?:
    | ClientSecretCredential
    | ClientCertificateCredential
    | UsernamePasswordCredential = undefined;
  /**
   * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
   *
   * Required environment variables:
   * - `AZURE_TENANT_ID`: The Azure Active Directory tenant (directory) ID.
   * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
   *
   * Environment variables used for client credential authentication:
   * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
   * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
   *
   * Alternatively, users can provide environment variables for username and password authentication:
   * - `AZURE_USERNAME`: Username to authenticate with.
   * - `AZURE_PASSWORD`: Password to authenticate with.
   *
   * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
   * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options?: EnvironmentCredentialOptions) {
    // Keep track of any missing environment variables for error details

    const assigned = processEnvVars(AllSupportedEnvironmentVariables).assigned.join(", ");
    logger.info(`Found the following environment variables: ${assigned}`);

    const tenantId = process.env.AZURE_TENANT_ID,
      clientId = process.env.AZURE_CLIENT_ID,
      clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (tenantId) {
      checkTenantId(logger, tenantId);
    }

    if (tenantId && clientId && clientSecret) {
      logger.info(
        `Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`
      );
      this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);
      return;
    }

    const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
    if (tenantId && clientId && certificatePath) {
      logger.info(
        `Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`
      );
      this._credential = new ClientCertificateCredential(
        tenantId,
        clientId,
        { certificatePath },
        options
      );
      return;
    }

    const username = process.env.AZURE_USERNAME;
    const password = process.env.AZURE_PASSWORD;
    if (tenantId && clientId && username && password) {
      logger.info(
        `Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`
      );
      this._credential = new UsernamePasswordCredential(
        tenantId,
        clientId,
        username,
        password,
        options
      );
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - Optional parameters. See {@link GetTokenOptions}.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${credentialName}.getToken`, options, async (newOptions) => {
      if (this._credential) {
        try {
          const result = await this._credential.getToken(scopes, newOptions);
          logger.getToken.info(formatSuccess(scopes));
          return result;
        } catch (err) {
          const authenticationError = new AuthenticationError(400, {
            error: `${credentialName} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
            error_description: err.message.toString().split("More details:").join(""),
          });
          logger.getToken.info(formatError(scopes, authenticationError));
          throw authenticationError;
        }
      }
      throw new CredentialUnavailableError(
        `${credentialName} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`
      );
    });
  }
}
