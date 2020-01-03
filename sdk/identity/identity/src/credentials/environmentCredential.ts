// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { ClientSecretCredential } from "./clientSecretCredential";
import { createSpan } from "../util/tracing";
import { AuthenticationError, AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from "../util/logging";
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
  private _environmentVarsMissing: string[] = [];
  private _credential?: TokenCredential = undefined;
  /**
   * Creates an instance of the EnvironmentCredential class and reads
   * client secret details from environment variables.  If the expected
   * environment variables are not found at this time, the getToken method
   * will return null when invoked.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: TokenCredentialOptions) {
    // Keep track of any missing environment variables for error details
    this._environmentVarsMissing = AllSupportedEnvironmentVariables.filter(
      (v) => process.env[v] === undefined
    );

    const tenantId = process.env.AZURE_TENANT_ID,
      clientId = process.env.AZURE_CLIENT_ID,
      clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (tenantId && clientId && clientSecret) {
      logger.info(
        `EnvironmentCredential: loaded with tenant ID: ${tenantId}, clientId: ${clientId}`
      );
      this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);
      return;
    }

    const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
    if (tenantId && clientId && certificatePath) {
      logger.info(
        `EnvironmentCredential: loaded with tenant ID: ${tenantId}, clientId: ${clientId}, certificatePath: ${certificatePath}`
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
        `EnvironmentCredential: loaded with tenant ID: ${tenantId}, clientId: ${clientId}, username: ${username}`
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
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, options: newOptions } = createSpan("EnvironmentCredential-getToken", options);
    if (this._credential) {
      try {
        return await this._credential.getToken(scopes, newOptions);
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

    // If by this point we don't have a credential, throw an exception so that
    // the user knows the credential was not configured appropriately
    span.setStatus({ code: CanonicalCode.UNAUTHENTICATED });
    span.end();
    throw new AuthenticationError(400, {
      error: "missing_environment_variables",
      error_description: `EnvironmentCredential cannot return a token because one or more of the following environment variables is missing:

${this._environmentVarsMissing.join("\n")}

To authenticate with a service principal AZURE_TENANT_ID, AZURE_CLIENT_ID, and either AZURE_CLIENT_SECRET or AZURE_CLIENT_CERTIFICATE_PATH must be set.  To authenticate with a user account AZURE_TENANT_ID, AZURE_USERNAME, and AZURE_PASSWORD must be set.
`
    });
  }
}
