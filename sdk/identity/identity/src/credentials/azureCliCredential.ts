// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { ensureValidScopeForDevTimeCreds, getScopeResource } from "../util/scopeUtils";
import { AzureCliCredentialOptions } from "./azureCliCredentialOptions";
import { CredentialUnavailableError } from "../errors";
import child_process from "child_process";
import {
  checkTenantId,
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { tracingClient } from "../util/tracing";

/**
 * Mockable reference to the CLI credential cliCredentialFunctions
 * @internal
 */
export const cliCredentialInternals = {
  /**
   * @internal
   */
  getSafeWorkingDir(): string {
    if (process.platform === "win32") {
      if (!process.env.SystemRoot) {
        throw new Error("Azure CLI credential expects a 'SystemRoot' environment variable");
      }
      return process.env.SystemRoot;
    } else {
      return "/bin";
    }
  },

  /**
   * Gets the access token from Azure CLI
   * @param resource - The resource to use when getting the token
   * @internal
   */
  async getAzureCliAccessToken(
    resource: string,
    tenantId?: string,
    timeout?: number
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    let tenantSection: string[] = [];
    if (tenantId) {
      tenantSection = ["--tenant", tenantId];
    }
    return new Promise((resolve, reject) => {
      try {
        child_process.execFile(
          "az",
          [
            "account",
            "get-access-token",
            "--output",
            "json",
            "--resource",
            resource,
            ...tenantSection,
          ],
          { cwd: cliCredentialInternals.getSafeWorkingDir(), shell: true, timeout },
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr, error });
          }
        );
      } catch (err: any) {
        reject(err);
      }
    });
  },
};

const logger = credentialLogger("AzureCliCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 */
export class AzureCliCredential implements TokenCredential {
  private tenantId?: string;
  private additionallyAllowedTenantIds: string[];
  private timeout?: number;

  /**
   * Creates an instance of the {@link AzureCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'az' tool using the command "az login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options?: AzureCliCredentialOptions) {
    if (options?.tenantId) {
      checkTenantId(logger, options?.tenantId);
      this.tenantId = options?.tenantId;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );
    this.timeout = options?.processTimeoutInMs;
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
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

    if (tenantId) {
      checkTenantId(logger, tenantId);
    }
    const scope = typeof scopes === "string" ? scopes : scopes[0];
    logger.getToken.info(`Using the scope ${scope}`);

    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      try {
        ensureValidScopeForDevTimeCreds(scope, logger);
        const resource = getScopeResource(scope);
        const obj = await cliCredentialInternals.getAzureCliAccessToken(
          resource,
          tenantId,
          this.timeout
        );
        const specificScope = obj.stderr?.match("(.*)az login --scope(.*)");
        const isLoginError = obj.stderr?.match("(.*)az login(.*)") && !specificScope;
        const isNotInstallError =
          obj.stderr?.match("az:(.*)not found") || obj.stderr?.startsWith("'az' is not recognized");

        if (isNotInstallError) {
          const error = new CredentialUnavailableError(
            "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isLoginError) {
          const error = new CredentialUnavailableError(
            "Please run 'az login' from a command prompt to authenticate before using this credential."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        try {
          const responseData = obj.stdout;
          const response: { accessToken: string; expiresOn: string } = JSON.parse(responseData);
          logger.getToken.info(formatSuccess(scopes));
          const returnValue = {
            token: response.accessToken,
            expiresOnTimestamp: new Date(response.expiresOn).getTime(),
          };
          return returnValue;
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
