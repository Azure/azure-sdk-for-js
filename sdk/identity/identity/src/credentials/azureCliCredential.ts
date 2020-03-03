// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from "../util/logging";

import * as child_process from "child_process";

export interface CredentialClient {
  getAzureCliAccessToken(resource: string): Promise<any>;
}

class AzureCliCredentialClient implements CredentialClient {
  public getAzureCliAccessToken(resource: string) {
    return new Promise((resolve, reject) => {
      try {
        child_process.exec(
          `az account get-access-token --output json --resource ${resource}`,
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export interface AzureCliCredentialOptions {
  azureCliCredentialClient?: CredentialClient;
}

/**
 * Provides the user access token and expire time
 * with azure cli command "az account get-access-token" in powershell.
 */
export class AzureCliCredential implements TokenCredential {
  private client: CredentialClient;
  /**
   * Creates an instance of the AzureCliCredential class.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: AzureCliCredentialOptions) {
    if (options && options.azureCliCredentialClient) {
      this.client = options.azureCliCredentialClient;
    } else {
      this.client = new AzureCliCredentialClient();
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
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("AzureCliCredential-getToken", options);

    return new Promise((resolve, reject) => {
      let scope: string;
      scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.info(`use the scope ${scope}`);
      const resource = scope.replace(/\/.default$/, "");
      let responseData = "";

      const { span } = createSpan("AzureCliCredential-getToken", options);
      this.client
        .getAzureCliAccessToken(resource)
        .then((obj: any) => {
          if (obj.stderr) {
            let isLoginError = obj.stderr.match("Please run 'az login' to setup account");
            let isNotInstallError =
              obj.stderr.match("az:(.*)not found") ||
              obj.stderr.startsWith("'az' is not recognized");
            if (isNotInstallError) {
              throw new Error("Azure CLI not Installed");
            } else if (isLoginError) {
              throw new Error("Azure user is not logged in");
            }
            throw new Error(obj.stderr);
          } else {
            responseData = obj.stdout;
            const response: { accessToken: string; expiresOn: string } = JSON.parse(responseData);
            resolve({
              token: response.accessToken,
              expiresOnTimestamp: new Date(response.expiresOn).getTime()
            });
          }
        })
        .catch((err) => {
          const code =
            err.name === AuthenticationErrorName
              ? CanonicalCode.UNAUTHENTICATED
              : CanonicalCode.UNKNOWN;
          span.setStatus({
            code,
            message: err.message
          });
          reject(err);
        });
    });
  }
}
