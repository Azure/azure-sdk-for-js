// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { ClientCertificateCredential } from "./clientCertificateCredential";
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
  private filePath: string;
  /**
   * Creates an instance of the authFileCredential class.
   *
   * @param filePath The path to the SDK Auth file.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(filePath: string) {
    this.filePath = filePath;
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
    const { span, options: newOptions } = createSpan("authFileCredential-getToken", options);
    if (this.credential) {
      try {
        await this.ensureCredential();
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
        return null;
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
    if (this.credential == null) {
      try {
        let authData = JSON.parse(fs.readFileSync(this.filePath).toString());
        await this.buildCredentialForCredentialFile(authData);
      } catch (err) {
        throw new Error("error parsing SDK Auth File");
      }
    }
  }

  async buildCredentialForCredentialFile(authData: any) {
    if (this.credential == null && typeof authData == "object") {
      let clientId = authData["clientId"];
      let certificatePath = authData["certificatePath"];
      let tenantId = authData["tenantId"];
      let activeDirectoryEndpointUrl = authData["activeDirectoryEndpointUrl"];

      if (
        clientId == undefined ||
        certificatePath == undefined ||
        tenantId == undefined ||
        activeDirectoryEndpointUrl == undefined
      ) {
        throw new Error("there was a problem building the credential.");
      }

      this.credential = new ClientCertificateCredential(tenantId, clientId, certificatePath, {
        authorityHost: activeDirectoryEndpointUrl
      });
    }
  }
}
