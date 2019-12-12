// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as child_process from "child_process";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";

export class CliCredential implements TokenCredential {
  private identityClient: IdentityClient;

  /**
   * Creates an instance of the CliCredential with the details
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
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
  public async getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return new Promise((resolve, reject) => {
      let scope: string

      if (Array.isArray(scopes)) {
        if (scopes.length > 1) {
          reject(new Error("CliCredential only supports a single scope"));
        }
        scope = scopes[0];
      } else {
        scope = scopes;
      }

      if (!scope) {
        reject(new Error("scope must be provided"));
      }

      const resource = scope.replace(/\/.default$/, "");

      // TODO: Do we need to be concerned with shell escaping here?
      //
      // NOTE: On Windows, we have to call `az.cmd` not just `az`. I hope it's just called `az` on these other platforms.
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
