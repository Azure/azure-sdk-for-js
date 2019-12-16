// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as child_process from "child_process";
import { TokenCredential, GetTokenOptions, AccessToken, delay } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from '../util/logging';

/**
 * Provides the user access token and expire time
 * with azure cli command "az account get-access-token" in powershell.  
 */
export class CliCredential implements TokenCredential {
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
    const { span } = createSpan("CliCredential-getToken", options);
    return new Promise((resolve, reject) => {
      let scope: string;
      scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.info(`use the scope ${scope}`);
      const resource = scope.replace(/\/.default$/, "");
      let responseData = "";

      try {
        // const child = child_process.spawn(`az${process.platform === "win32" ? ".cmd" : ""}`, ["account", "get-access-token", "--resource", resource]);
        const { span } = createSpan("CliCredential-getToken", options);
        let az = process.platform === "win32" ? "az.cmd" : "az";
        child_process.exec(`${az} account get-access-token --resource ${resource}`, (err, stdout, stderr) => {
          responseData = stdout;
          if (process.platform == "linux") {
            if (stderr.match("az:(.*)not found")) {
              throw new Error("Azure CLI not Installed");
            }
          }
          else if (stderr.startsWith("'az.cmd' is not recognized")) {
            throw new Error("Azure CLI not Installed");
          }
          const response: { accessToken: string, expiresOn: string } = JSON.parse(responseData);
          resolve({ token: response.accessToken, expiresOnTimestamp: new Date(response.expiresOn).getTime() });
        });
      } catch (err) {
        const code =
          err.name === AuthenticationErrorName
            ? CanonicalCode.UNAUTHENTICATED
            : CanonicalCode.UNKNOWN;
        span.setStatus({
          code,
          message: err.message
        });
        reject(err);
      }
    });
  }
}
