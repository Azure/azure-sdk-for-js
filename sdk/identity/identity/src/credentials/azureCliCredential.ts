// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/types";
import { logger } from "../util/logging";

import * as child_process from "child_process";

function getSafeWorkingDir(): string {
  if (process.platform === "win32") {
    if (!process.env.SystemRoot) {
      throw new Error("Azure CLI credential expects a 'SystemRoot' environment variable");
    }
    return process.env.SystemRoot;
  } else {
    return "/bin";
  }
}

/**
 * Provides the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 */
export class AzureCliCredential implements TokenCredential {
  /**
   * Creates an instance of the AzureCliCredential class.
   */
  constructor() {}

  /**
   * Gets the access token from Azure CLI
   * @param resource The resource to use when getting the token
   */
  protected async getAzureCliAccessToken(resource: string) {
    return new Promise((resolve, reject) => {
      try {
        child_process.exec(
          `az account get-access-token --output json --resource ${resource}`,
          { cwd: getSafeWorkingDir() },
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
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
    return new Promise((resolve, reject) => {
      let scope: string;
      scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.info(`use the scope ${scope}`);
      const resource = scope.replace(/\/.default$/, "");

      // Check to make sure the scope we get back is a valid scope
      if (!scope.match(/^[0-9a-zA-Z-.:/]+$/)) {
        throw new Error("Invalid scope was specified by the user or calling client");
      }

      let responseData = "";

      const { span } = createSpan("AzureCliCredential-getToken", options);
      this.getAzureCliAccessToken(resource)
        .then((obj: any) => {
          if (obj.stderr) {
            let isLoginError = obj.stderr.match("(.*)az login(.*)");
            let isNotInstallError =
              obj.stderr.match("az:(.*)not found") ||
              obj.stderr.startsWith("'az' is not recognized");
            if (isNotInstallError) {
              throw new Error(
                "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
              );
            } else if (isLoginError) {
              throw new Error(
                "Please run 'az login' from a command prompt to authenticate before using this credential."
              );
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
