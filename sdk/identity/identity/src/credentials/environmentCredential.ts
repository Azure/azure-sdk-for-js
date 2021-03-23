// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { credentialLogger, processEnvVars, formatSuccess, formatError } from "../util/logging";
import { TokenCredentialOptions } from "../client/identityClient";
import { ClientSecretCredential } from "./clientSecretCredential";
import { AuthenticationError, CredentialUnavailable } from "../client/errors";
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
  "AZURE_PASSWORD"
];

const logger = credentialLogger("EnvironmentCredential");

/**
 * Enables authentication to Azure Active Directory using client secret
 * details configured in the following environment variables:
 *
 * - AZURE_TENANT_ID: The Azure Active Directory tenant (directory) ID.
 * - AZURE_CLIENT_ID: The client (application) ID of an App Registration in the tenant.
 * - AZURE_CLIENT_SECRET: A client secret that was generated for the App Registration.
 *
 * This credential ultimately uses a {@link ClientSecretCredential} to
 * perform the authentication using these details.  Please consult the
 * documentation of that class for more details.
 */
export class EnvironmentCredential implements TokenCredential {
  private _credential?: TokenCredential = undefined;
  /**
   * Creates an instance of the EnvironmentCredential class and reads
   * client secret details from environment variables.  If the expected
   * environment variables are not found at this time, the getToken method
   * will return null when invoked.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options?: TokenCredentialOptions) {
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
        certificatePath,
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
    return trace("EnvironmentCredential.getToken", options, async (newOptions) => {
      if (this._credential) {
        try {
          const result = await this._credential.getToken(scopes, newOptions);
          logger.getToken.info(formatSuccess(scopes));
          if (result === null) {
            throw new CredentialUnavailable("The credential couldn't retrieve a token.");
          }
          return result;
        } catch (err) {
          const authenticationError = new AuthenticationError(400, {
            error: "EnvironmentCredential authentication failed.",
            error_description: err.message
              .toString()
              .split("More details:")
              .join("")
          });
          logger.getToken.info(formatError(scopes, authenticationError));
          throw authenticationError;
        }
      }
      throw new CredentialUnavailable("No underlying credential could be used.");
    });
  }
}
