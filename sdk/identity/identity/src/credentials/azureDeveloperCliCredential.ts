// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, } from "../util/logging";
import { AzureDeveloperCliCredentialOptions } from "./azureDeveloperCliCredentialOptions";
import { CredentialUnavailableError } from "../errors";
import child_process from "child_process";

/**
 * Mockable reference to the Developer CLI credential cliCredentialFunctions
 * @internal
 */
export const developerCliCredentialInternals = {
  /**
   * @internal
   */
  getSafeWorkingDir(): string {
    if (process.platform === "win32") {
      if (!process.env.SystemRoot) {
        throw new Error("Azure Developer CLI credential expects a 'SystemRoot' environment variable");
      }
      return process.env.SystemRoot;
    } else {
      return "/bin";
    }
  },

  /**
   * Gets the access token from Azure CLI
   * @param scopes - The scopes to use when getting the token
   * @internal
   */
  async getAzdAccessToken(
    scopes: string[]
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    return new Promise((resolve, reject) => {
      try {
          child_process.execFile(
              "azd",
              [
                  "auth",
                  "token",
                  "--output",
                  "json",
                  ...scopes.reduce<string[]>((previous, current) => previous.concat("--scope", current), []),
              ],
              { cwd: developerCliCredentialInternals.getSafeWorkingDir() },
              (error, stdout, stderr) => {
                  resolve({ stdout, stderr, error });
              }
          );
      } catch (err: any) {
          reject(err);
      }
  });
  },
};

const logger = credentialLogger("AzureDeveloperCliCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure Developer CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure Developer CLI command "azd auth token".
 */
export class AzureDeveloperCliCredential implements TokenCredential {
  /**
   * Creates an instance of the {@link AzureDeveloperCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'azd' tool using the command "azd login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  // @ts-ignore
  constructor(options?: AzureDeveloperCliCredentialOptions) {
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
  ): Promise<AccessToken> {
    if (typeof(scopes) === "string") {
      scopes = [scopes];
  }
  logger.getToken.info(`Using the scopes ${scopes}`);

  try {
      const obj = await developerCliCredentialInternals.getAzdAccessToken(scopes);
      const isNotLoggedInError = obj.stderr?.match("not logged in, run `azd login` to login");

      if (isNotLoggedInError) {
          throw new CredentialUnavailableError(
              "Please run 'azd login' from a command prompt to authenticate before using this credential."
          );
      }

      if (obj.error && (obj.error as any).code === "ENOENT") {
          throw new CredentialUnavailableError(
              "Azure Developer CLI could not be found. Please visit https://aka.ms/azure-dev for installation instructions and then, once installed, authenticate to your Azure account using 'azd login'."
          );
      }

      try {
          const resp: { token: string, expiresOn: string} = JSON.parse(obj.stdout);

          return {
              token: resp.token,
              expiresOnTimestamp: new Date(resp.expiresOn).getTime()
          };
      } catch (e: any) {
          if (obj.stderr) {
              throw new CredentialUnavailableError(obj.stderr);
          }

          throw e;
        }
      } catch (err: any) {
        const error =
          err.name === "CredentialUnavailableError"
              ? err
              : new CredentialUnavailableError(
                  (err as Error).message || "Unknown error while trying to retrieve the access token"
              );

        throw error;
      }
  }
}
