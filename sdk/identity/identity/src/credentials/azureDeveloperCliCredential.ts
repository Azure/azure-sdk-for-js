// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { AzureDeveloperCliCredentialOptions } from "./azureDeveloperCliCredentialOptions";
import { CredentialUnavailableError } from "../errors";
import child_process from "child_process";
import {
  processMultiTenantRequest,
  resolveAddionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { tracingClient } from "../util/tracing";

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
        throw new Error(
          "Azure Developer CLI credential expects a 'SystemRoot' environment variable"
        );
      }
      return process.env.SystemRoot;
    } else {
      return "/bin";
    }
  },

  /**
   * Gets the access token from Azure Developer CLI
   * @param scopes - The scopes to use when getting the token
   * @internal
   */
  async getAzdAccessToken(
    scopes: string[],
    tenantId?: string,
    timeout?: number
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    let tenantSection: string[] = [];
    if (tenantId) {
      tenantSection = ["--tenant-id", tenantId];
    }
    return new Promise((resolve, reject) => {
      try {
        child_process.execFile(
          "azd",
          [
            "auth",
            "token",
            "--output",
            "json",
            ...scopes.reduce<string[]>(
              (previous, current) => previous.concat("--scope", current),
              []
            ),
            ...tenantSection,
          ],
          {
            cwd: developerCliCredentialInternals.getSafeWorkingDir(),
            shell: true,
            timeout,
          },
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
  private tenantId?: string;
  private additionallyAllowedTenantIds: string[];
  private timeout?: number;

  /**
   * Creates an instance of the {@link AzureDeveloperCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'azd' tool using the command "azd login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options?: AzureDeveloperCliCredentialOptions) {
    this.tenantId = options?.tenantId;
    this.additionallyAllowedTenantIds = resolveAddionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );
    this.timeout = options?.processTimeoutInMs;
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
    options: GetTokenOptions = {}
  ): Promise<AccessToken> {
    const tenantId = processMultiTenantRequest(
      this.tenantId,
      options,
      this.additionallyAllowedTenantIds
    );

    let scopeList: string[];
    if (typeof scopes === "string") {
      scopeList = [scopes];
    } else {
      scopeList = scopes;
    }
    logger.getToken.info(`Using the scopes ${scopes}`);

    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      try {
        const obj = await developerCliCredentialInternals.getAzdAccessToken(
          scopeList,
          tenantId,
          this.timeout
        );
        const isNotLoggedInError = obj.stderr?.match("not logged in, run `azd login` to login");
        const isNotInstallError =
          obj.stderr?.match("azd:(.*)not found") ||
          obj.stderr?.startsWith("'azd' is not recognized");

        if (isNotInstallError || (obj.error && (obj.error as any).code === "ENOENT")) {
          const error = new CredentialUnavailableError(
            "Azure Developer CLI could not be found. Please visit https://aka.ms/azure-dev for installation instructions and then, once installed, authenticate to your Azure account using 'azd login'."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }

        if (isNotLoggedInError) {
          const error = new CredentialUnavailableError(
            "Please run 'azd login' from a command prompt to authenticate before using this credential."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }

        try {
          const resp: { token: string; expiresOn: string } = JSON.parse(obj.stdout);
          logger.getToken.info(formatSuccess(scopes));
          return {
            token: resp.token,
            expiresOnTimestamp: new Date(resp.expiresOn).getTime(),
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
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
    });
  }
}
