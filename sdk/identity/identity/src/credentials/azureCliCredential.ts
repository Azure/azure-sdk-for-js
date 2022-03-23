// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

import { createSpan } from "../util/tracing";
import { CredentialUnavailableError } from "../errors";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import child_process from "child_process";
import { ensureValidScope, getScopeResource } from "../util/scopeUtils";
import { AzureCliCredentialOptions } from "./azureCliCredentialOptions";
import { processMultiTenantRequest } from "../util/validateMultiTenant";
import { checkTenantId } from "../util/checkTenantId";

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
    tenantId?: string
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
          { cwd: cliCredentialInternals.getSafeWorkingDir(), shell: true },
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr, error });
          }
        );
      } catch (err) {
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

  /**
   * Creates an instance of the {@link AzureCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'az' tool using the command "az login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options?: AzureCliCredentialOptions) {
    this.tenantId = options?.tenantId;
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
    options?: GetTokenOptions
  ): Promise<AccessToken> {
    const tenantId = processMultiTenantRequest(this.tenantId, options);
    if (tenantId) {
      checkTenantId(logger, tenantId);
    }

    const scope = typeof scopes === "string" ? scopes : scopes[0];
    logger.getToken.info(`Using the scope ${scope}`);
    ensureValidScope(scope, logger);
    const resource = getScopeResource(scope);

    let responseData = "";

    const { span } = createSpan(`${this.constructor.name}.getToken`, options);

    try {
      const obj = await cliCredentialInternals.getAzureCliAccessToken(resource, tenantId);
      if (obj.stderr) {
        const isLoginError = obj.stderr.match("(.*)az login(.*)");
        const isNotInstallError =
          obj.stderr.match("az:(.*)not found") || obj.stderr.startsWith("'az' is not recognized");
        if (isNotInstallError) {
          const error = new CredentialUnavailableError(
            "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        } else if (isLoginError) {
          const error = new CredentialUnavailableError(
            "Please run 'az login' from a command prompt to authenticate before using this credential."
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        const error = new CredentialUnavailableError(obj.stderr);
        logger.getToken.info(formatError(scopes, error));
        throw error;
      } else {
        responseData = obj.stdout;
        const response: { accessToken: string; expiresOn: string } = JSON.parse(responseData);
        logger.getToken.info(formatSuccess(scopes));
        const returnValue = {
          token: response.accessToken,
          expiresOnTimestamp: new Date(response.expiresOn).getTime(),
        };
        return returnValue;
      }
    } catch (err) {
      const error = new Error(
        (err as Error).message || "Unknown error while trying to retrieve the access token"
      );
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      logger.getToken.info(formatError(scopes, error));
      throw error;
    }
  }
}
