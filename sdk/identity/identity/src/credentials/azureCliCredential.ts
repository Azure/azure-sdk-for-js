// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  checkTenantId,
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils.js";
import { credentialLogger, formatError, formatSuccess } from "../util/logging.js";
import { ensureValidScopeForDevTimeCreds, getScopeResource } from "../util/scopeUtils.js";

import type { AzureCliCredentialOptions } from "./azureCliCredentialOptions.js";
import { CredentialUnavailableError } from "../errors.js";
import child_process from "child_process";
import { tracingClient } from "../util/tracing.js";
import { checkSubscription } from "../util/subscriptionUtils.js";

const logger = credentialLogger("AzureCliCredential");

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
      let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
      if (!systemRoot) {
        logger.getToken.warning(
          "The SystemRoot environment variable is not set. This may cause issues when using the Azure CLI credential.",
        );

        systemRoot = "C:\\Windows";
      }
      return systemRoot;
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
    subscription?: string,
    timeout?: number,
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    let tenantSection: string[] = [];
    let subscriptionSection: string[] = [];
    if (tenantId) {
      tenantSection = ["--tenant", tenantId];
    }
    if (subscription) {
      // Add quotes around the subscription to handle subscriptions with spaces
      subscriptionSection = ["--subscription", `"${subscription}"`];
    }
    return new Promise((resolve, reject) => {
      try {
        const args = [
          "account",
          "get-access-token",
          "--output",
          "json",
          "--resource",
          resource,
          ...tenantSection,
          ...subscriptionSection,
        ];
        const command = ["az", ...args].join(" ");
        child_process.exec(
          command,
          { cwd: cliCredentialInternals.getSafeWorkingDir(), timeout },
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr, error });
          },
        );
      } catch (err: any) {
        reject(err);
      }
    });
  },
};

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
  private subscription?: string;

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
    if (options?.subscription) {
      checkSubscription(logger, options?.subscription);
      this.subscription = options?.subscription;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants,
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
    options: GetTokenOptions = {},
  ): Promise<AccessToken> {
    const tenantId = processMultiTenantRequest(
      this.tenantId,
      options,
      this.additionallyAllowedTenantIds,
    );
    if (tenantId) {
      checkTenantId(logger, tenantId);
    }
    if (this.subscription) {
      checkSubscription(logger, this.subscription);
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
          this.subscription,
          this.timeout,
        );
        const specificScope = obj.stderr?.match("(.*)az login --scope(.*)");
        const isLoginError = obj.stderr?.match("(.*)az login(.*)") && !specificScope;
        const isNotInstallError =
          obj.stderr?.match("az:(.*)not found") || obj.stderr?.startsWith("'az' is not recognized");

        if (isNotInstallError) {
          const error = new CredentialUnavailableError(
            "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.",
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isLoginError) {
          const error = new CredentialUnavailableError(
            "Please run 'az login' from a command prompt to authenticate before using this credential.",
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        try {
          const responseData = obj.stdout;
          const response: AccessToken = this.parseRawResponse(responseData);
          logger.getToken.info(formatSuccess(scopes));
          return response;
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
                (err as Error).message || "Unknown error while trying to retrieve the access token",
              );
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
    });
  }

  /**
   * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
   *
   * @param rawResponse - The raw JSON response from the Azure CLI
   * @returns An access token with the expiry time parsed from the raw response
   *
   * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
   *
   * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
   */
  private parseRawResponse(rawResponse: string): AccessToken {
    const response: any = JSON.parse(rawResponse);
    const token = response.accessToken;
    // if available, expires_on will be a number representing seconds since epoch.
    // ensure it's a number or NaN
    let expiresOnTimestamp = Number.parseInt(response.expires_on, 10) * 1000;
    if (!isNaN(expiresOnTimestamp)) {
      logger.getToken.info("expires_on is available and is valid, using it");
      return {
        token,
        expiresOnTimestamp,
        tokenType: "Bearer",
      };
    }

    // fallback to the older expiresOn - an RFC3339 date string
    expiresOnTimestamp = new Date(response.expiresOn).getTime();

    // ensure expiresOn is well-formatted
    if (isNaN(expiresOnTimestamp)) {
      throw new CredentialUnavailableError(
        `Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got: "${response.expiresOn}"`,
      );
    }

    return {
      token,
      expiresOnTimestamp,
      tokenType: "Bearer",
    };
  }
}
