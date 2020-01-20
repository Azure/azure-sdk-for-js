// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { ClientSecretCredential } from "./clientSecretCredential";
import * as fs from "fs";

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
export class AuthFileCredential implements TokenCredential {
  private credential?: TokenCredential = undefined;
  private identityClient: IdentityClient;
  private filePath;
  /**
   * Creates an instance of the authFileCredential class.
   *
   * @param filePath The path to the SDK Auth file.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(filePath: string);
  constructor(filePath: string, options?: TokenCredentialOptions) {
    this.filePath = filePath;
    this.identityClient = new IdentityClient(options);
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    await this.ensureCredential();
    const { span, options: newOptions } = createSpan("authFileCredential-getToken", options);
    if (this.credential) {
      try {
        return await this.credential.getToken(scopes, newOptions);
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
  }

  async ensureCredential() {
    try {
      if (this.credential == null) {
        this.credential = await this.BuildCredentialForCredentialsFile(
          JSON.parse(fs.readFileSync(this.filePath).toString())
        );
      }
    } catch (err) {
      throw new Error("Error parsing SDK Auth File");
    }
  }

  async BuildCredentialForCredentialsFile(authData: Array<any>) {
    let clientId = authData["clientId"];
    let clientSecret = authData["clientSecret"];
    let tenantId = authData["tenantId"];
    let activeDirectoryEndpointUrl = authData["activeDirectoryEndpointUrl"];

    if (
      clientId == null ||
      clientSecret == null ||
      tenantId == null ||
      activeDirectoryEndpointUrl == null
    ) {
      throw new Error(
        "Malformed Azure SDK Auth file. The file should contain 'clientId', 'clientSecret', 'tenentId' and 'activeDirectoryEndpointUrl' values."
      );
    }

    return new ClientSecretCredential(tenantId, clientId, clientSecret, {
      authorityHost: activeDirectoryEndpointUrl
    });
  }
}
