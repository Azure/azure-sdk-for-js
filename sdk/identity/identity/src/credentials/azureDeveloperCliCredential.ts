// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError, formatSuccess } from "../util/logging.js";
import type { AzureDeveloperCliCredentialOptions } from "./azureDeveloperCliCredentialOptions.js";
import { CredentialUnavailableError } from "../errors.js";
import child_process from "child_process";
import {
  checkTenantId,
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils.js";
import { tracingClient } from "../util/tracing.js";
import { ensureValidScopeForDevTimeCreds } from "../util/scopeUtils.js";

const logger = credentialLogger("AzureDeveloperCliCredential");

/**
 * Messages to use when throwing in this credential.
 * @internal
 */
export const azureDeveloperCliPublicErrorMessages = {
  notInstalled:
    "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  login:
    "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  unknown: "Unknown error while trying to retrieve the access token",
  claim:
    "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
};

/**
 * Mockable reference to the Developer CLI credential cliCredentialFunctions
 * @internal
 */
export const developerCliCredentialInternals = {
  /**
   * Parses azd stderr JSON output to extract the error message.
   * azd outputs JSON like: \{"type":"consoleMessage","timestamp":"...","data":\{"message":"ERROR: ..."\}\}
   * If parsing succeeds and .data.message exists, returns the trimmed message.
   * Otherwise, returns the raw stderr.
   * @param stderr - The stderr output from azd command
   * @returns The parsed error message or raw stderr
   * @internal
   */
  parseAzdStderr(stderr: string): string {
    try {
      const parsed = JSON.parse(stderr);
      const message = parsed?.data?.message;
      if (typeof message === "string" && message.trim().length > 0) {
        return message.trim();
      }
    } catch {
      // If JSON parsing fails, fall through to return raw stderr
    }
    return stderr;
  },

  /**
   * @internal
   */
  getSafeWorkingDir(): string {
    if (process.platform === "win32") {
      let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
      if (!systemRoot) {
        logger.getToken.warning(
          "The SystemRoot environment variable is not set. This may cause issues when using the Azure Developer CLI credential.",
        );

        systemRoot = "C:\\Windows";
      }

      return systemRoot;
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
    timeout?: number,
    claims?: string,
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    let tenantSection: string[] = [];
    if (tenantId) {
      tenantSection = ["--tenant-id", tenantId];
    }

    let claimsSections: string[] = [];
    if (claims) {
      const encodedClaims = btoa(claims);
      claimsSections = ["--claims", encodedClaims];
    }
    return new Promise((resolve, reject) => {
      try {
        const args = [
          "auth",
          "token",
          "--output",
          "json",
          "--no-prompt",
          ...scopes.reduce<string[]>(
            (previous, current) => previous.concat("--scope", current),
            [],
          ),
          ...tenantSection,
          ...claimsSections,
        ];
        const command = ["azd", ...args].join(" ");
        child_process.exec(
          command,
          {
            cwd: developerCliCredentialInternals.getSafeWorkingDir(),
            timeout,
          },
          (error, stdout, stderr) => {
            resolve({ stdout, stderr, error });
          },
        );
      } catch (err: any) {
        reject(err);
      }
    });
  },
};

/**
 * Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy
 * resources in Azure. It's built on top of the Azure CLI and provides additional functionality specific
 * to Azure developers. It allows users to authenticate as a user and/or a service principal against
 * <a href="https://learn.microsoft.com/entra/fundamentals/">Microsoft Entra ID</a>. The
 * AzureDeveloperCliCredential authenticates in a development environment and acquires a token on behalf of
 * the logged-in user or service principal in the Azure Developer CLI. It acts as the Azure Developer CLI logged in user or
 * service principal and executes an Azure CLI command underneath to authenticate the application against
 * Microsoft Entra ID.
 *
 * <h2> Configure AzureDeveloperCliCredential </h2>
 *
 * To use this credential, the developer needs to authenticate locally in Azure Developer CLI using one of the
 * commands below:
 *
 * <ol>
 *     <li>Run "azd auth login" in Azure Developer CLI to authenticate interactively as a user.</li>
 *     <li>Run "azd auth login --client-id clientID --client-secret clientSecret
 *     --tenant-id tenantID" to authenticate as a service principal.</li>
 * </ol>
 *
 * You may need to repeat this process after a certain time period, depending on the refresh token validity in your
 * organization. Generally, the refresh token validity period is a few weeks to a few months.
 * AzureDeveloperCliCredential will prompt you to sign in again.
 */
export class AzureDeveloperCliCredential implements TokenCredential {
  private tenantId?: string;
  private additionallyAllowedTenantIds: string[];
  private timeout?: number;

  /**
   * Creates an instance of the {@link AzureDeveloperCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'azd' tool using the command "azd auth login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options?: AzureDeveloperCliCredentialOptions) {
    if (options?.tenantId) {
      checkTenantId(logger, options?.tenantId);
      this.tenantId = options?.tenantId;
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
    let scopeList: string[];
    if (typeof scopes === "string") {
      scopeList = [scopes];
    } else {
      scopeList = scopes;
    }
    logger.getToken.info(`Using the scopes ${scopes}`);

    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      try {
        scopeList.forEach((scope) => {
          ensureValidScopeForDevTimeCreds(scope, logger);
        });
        const obj = await developerCliCredentialInternals.getAzdAccessToken(
          scopeList,
          tenantId,
          this.timeout,
          options.claims,
        );
        const isMFARequiredError =
          obj.stderr?.match("must use multi-factor authentication") ||
          obj.stderr?.match("reauthentication required");
        const isNotLoggedInError =
          obj.stderr?.match("not logged in, run `azd login` to login") ||
          obj.stderr?.match("not logged in, run `azd auth login` to login");
        const isNotInstallError =
          obj.stderr?.match("azd:(.*)not found") ||
          obj.stderr?.startsWith("'azd' is not recognized");
        if (isNotInstallError || (obj.error && (obj.error as any).code === "ENOENT")) {
          const error = new CredentialUnavailableError(
            azureDeveloperCliPublicErrorMessages.notInstalled,
          );
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }

        if (isNotLoggedInError) {
          const error = new CredentialUnavailableError(azureDeveloperCliPublicErrorMessages.login);
          logger.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isMFARequiredError) {
          const scope = scopeList
            .reduce<string[]>((previous, current) => previous.concat("--scope", current), [])
            .join(" ");
          const loginCmd = `azd auth login ${scope}`;
          const error = new CredentialUnavailableError(
            `${azureDeveloperCliPublicErrorMessages.claim} ${loginCmd}`,
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
            tokenType: "Bearer",
          } as AccessToken;
        } catch (e: any) {
          if (obj.stderr) {
            const errorMessage = developerCliCredentialInternals.parseAzdStderr(obj.stderr);
            throw new CredentialUnavailableError(errorMessage);
          }
          throw e;
        }
      } catch (err: any) {
        const error =
          err.name === "CredentialUnavailableError"
            ? err
            : new CredentialUnavailableError(
                (err as Error).message || azureDeveloperCliPublicErrorMessages.unknown,
              );
        logger.getToken.info(formatError(scopes, error));
        throw error;
      }
    });
  }
}
