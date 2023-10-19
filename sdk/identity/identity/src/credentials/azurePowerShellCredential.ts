// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { ensureValidScopeForDevTimeCreds, getScopeResource } from "../util/scopeUtils";
import { AzurePowerShellCredentialOptions } from "./azurePowerShellCredentialOptions";
import { CredentialUnavailableError } from "../errors";
import {
  checkTenantId,
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { processUtils } from "../util/processUtils";
import { tracingClient } from "../util/tracing";

const logger = credentialLogger("AzurePowerShellCredential");

const isWindows = process.platform === "win32";

/**
 * Returns a platform-appropriate command name by appending ".exe" on Windows.
 *
 * @internal
 */
export function formatCommand(commandName: string): string {
  if (isWindows) {
    return `${commandName}.exe`;
  } else {
    return commandName;
  }
}

/**
 * Receives a list of commands to run, executes them, then returns the outputs.
 * If anything fails, an error is thrown.
 * @internal
 */
async function runCommands(commands: string[][], timeout?: number): Promise<string[]> {
  const results: string[] = [];

  for (const command of commands) {
    const [file, ...parameters] = command;
    const result = (await processUtils.execFile(file, parameters, {
      encoding: "utf8",
      timeout,
    })) as string;
    results.push(result);
  }

  return results;
}

/**
 * Known PowerShell errors
 * @internal
 */
export const powerShellErrors = {
  login: "Run Connect-AzAccount to login",
  installed:
    "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory",
};

/**
 * Messages to use when throwing in this credential.
 * @internal
 */
export const powerShellPublicErrorMessages = {
  login:
    "Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",
  installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,
  troubleshoot: `To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`,
};

// PowerShell Azure User not logged in error check.
const isLoginError: (err: Error) => RegExpMatchArray | null = (err: Error) =>
  err.message.match(`(.*)${powerShellErrors.login}(.*)`);

// Az Module not Installed in Azure PowerShell check.
const isNotInstalledError: (err: Error) => RegExpMatchArray | null = (err: Error) =>
  err.message.match(powerShellErrors.installed);

/**
 * The PowerShell commands to be tried, in order.
 *
 * @internal
 */
export const commandStack = [formatCommand("pwsh")];

if (isWindows) {
  commandStack.push(formatCommand("powershell"));
}

/**
 * This credential will use the currently logged-in user information from the
 * Azure PowerShell module. To do so, it will read the user access token and
 * expire time with Azure PowerShell command `Get-AzAccessToken -ResourceUrl {ResourceScope}`
 */
export class AzurePowerShellCredential implements TokenCredential {
  private tenantId?: string;
  private additionallyAllowedTenantIds: string[];
  private timeout?: number;

  /**
   * Creates an instance of the {@link AzurePowerShellCredential}.
   *
   * To use this credential:
   * - Install the Azure Az PowerShell module with:
   *   `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
   * - You have already logged in to Azure PowerShell using the command
   * `Connect-AzAccount` from the command line.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options?: AzurePowerShellCredentialOptions) {
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
   * Gets the access token from Azure PowerShell
   * @param resource - The resource to use when getting the token
   */
  private async getAzurePowerShellAccessToken(
    resource: string,
    tenantId?: string,
    timeout?: number
  ): Promise<{ Token: string; ExpiresOn: string }> {
    // Clone the stack to avoid mutating it while iterating
    for (const powerShellCommand of [...commandStack]) {
      try {
        await runCommands([[powerShellCommand, "/?"]], timeout);
      } catch (e: any) {
        // Remove this credential from the original stack so that we don't try it again.
        commandStack.shift();
        continue;
      }

      let tenantSection = "";
      if (tenantId) {
        tenantSection = `-TenantId "${tenantId}"`;
      }

      const results = await runCommands([
        [
          powerShellCommand,
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          "Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru",
        ],
        [
          powerShellCommand,
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          `Get-AzAccessToken ${tenantSection} -ResourceUrl "${resource}" | ConvertTo-Json`,
        ],
      ]);

      const result = results[1];
      try {
        return JSON.parse(result);
      } catch (e: any) {
        throw new Error(`Unable to parse the output of PowerShell. Received output: ${result}`);
      }
    }

    throw new Error(`Unable to execute PowerShell. Ensure that it is installed in your system`);
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If the authentication cannot be performed through PowerShell, a {@link CredentialUnavailableError} will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AccessToken> {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      const tenantId = processMultiTenantRequest(
        this.tenantId,
        options,
        this.additionallyAllowedTenantIds
      );
      const scope = typeof scopes === "string" ? scopes : scopes[0];
      if (tenantId) {
        checkTenantId(logger, tenantId);
      }
      try {
        ensureValidScopeForDevTimeCreds(scope, logger);
        logger.getToken.info(`Using the scope ${scope}`);
        const resource = getScopeResource(scope);
        const response = await this.getAzurePowerShellAccessToken(resource, tenantId, this.timeout);
        logger.getToken.info(formatSuccess(scopes));
        return {
          token: response.Token,
          expiresOnTimestamp: new Date(response.ExpiresOn).getTime(),
        };
      } catch (err: any) {
        if (isNotInstalledError(err)) {
          const error = new CredentialUnavailableError(powerShellPublicErrorMessages.installed);
          logger.getToken.info(formatError(scope, error));
          throw error;
        } else if (isLoginError(err)) {
          const error = new CredentialUnavailableError(powerShellPublicErrorMessages.login);
          logger.getToken.info(formatError(scope, error));
          throw error;
        }
        const error = new CredentialUnavailableError(
          `${err}. ${powerShellPublicErrorMessages.troubleshoot}`
        );
        logger.getToken.info(formatError(scope, error));
        throw error;
      }
    });
  }
}
