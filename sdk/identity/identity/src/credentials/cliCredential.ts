// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from '../util/logging';
import { CliCredentialClient } from '../client/CliCredentialClient';
import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Provides the user access token and expire time
 * with azure cli command "az account get-access-token" in powershell.  
 */
export class CliCredential implements TokenCredential {
  private client: CliCredentialClient;
  /**
   * Creates an instance of the CliCredential class.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: TokenCredentialOptions, cliCredentialClient: CliCredentialClient = new CliCredentialClient()) {
    this.client = cliCredentialClient;
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
    const { span } = createSpan("CliCredential-getToken", options);

    return new Promise((resolve, reject) => {
      let scope: string;
      scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.info(`use the scope ${scope}`);
      const resource = scope.replace(/\/.default$/, "");
      let responseData = "";

      const { span } = createSpan("CliCredential-getToken", options);
      this.client.createProcess(`az account get-access-token --resource ${resource}`).then(
        (obj: any) => {
          if (obj.stderr) {
            let isLoginError = obj.stderr.match("Please run 'az login' to setup account");
            let isNotInstallError = obj.stderr.match("az:(.*)not found") || obj.stderr.startsWith("'az' is not recognized");
            if (isNotInstallError) {
              throw new Error("Azure CLI not Installed");
            }
            else if (isLoginError) {
              throw new Error("Azure not login in")
            }
            throw new Error(obj.stderr);
          }
          else {
            responseData = obj.stdout;
            const response: { accessToken: string, expiresOn: string } = JSON.parse(responseData);
            resolve({ token: response.accessToken, expiresOnTimestamp: new Date(response.expiresOn).getTime() });
          }
        }
      ).catch((err) => {
        const code =
          err.name === AuthenticationErrorName
            ? CanonicalCode.UNAUTHENTICATED
            : CanonicalCode.UNKNOWN;
        span.setStatus({
          code,
          message: err.message
        });
        reject(err);
      })
    });
  }
}
