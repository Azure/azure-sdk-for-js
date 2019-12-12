// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as child_process from "child_process";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { IdentityClient, TokenCredentialOptions } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";

/**
 * Provides the user access token
 * with cli command "az account get-access-token" in powershell.  
 */
export class CliCredential implements TokenCredential {
  private identityClient: IdentityClient;

  /**
   * Creates an instance of the CliCredential class.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    options?: TokenCredentialOptions
  ) { }

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
  public async getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return new Promise((resolve, reject) => {
      let scope: string = "";

      if (Array.isArray(scopes)) {
        if (scopes.length > 1) {
          reject(new Error("CliCredential only supports a single scope"));
        }
        scope = scopes[0];
      } else {
        scope = scopes;
      }

      const resource = scope.replace(/\/.default$/, "");

      const child = child_process.spawn(`az${process.platform === "win32" ? ".cmd" : ""}`, ["account", "get-access-token", "--resource", resource]);

      let responseData = "";
      child.stdout.on("data", (d) => {
        responseData += d
      });

      child.stdout.on("end", () => {
        const { span } = createSpan("CliCredential-getToken", options);
        try {
          const response: { accessToken: string, expiresOn: string } = JSON.parse(responseData);
          resolve({ token: response.accessToken, expiresOnTimestamp: new Date(response.expiresOn).getTime() });
        } catch (error) {
          const code =
            error.name === AuthenticationErrorName
              ? CanonicalCode.UNAUTHENTICATED
              : CanonicalCode.UNKNOWN;
          span.setStatus({
            code,
            message: error.message
          });
          reject(error);
        }
      });
    })
  }
}
