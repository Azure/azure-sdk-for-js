// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { CredentialUnavailableError } from "../client/errors";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { trace } from "../util/tracing";
import { ensureValidScope, getScopeResource } from "../util/scopeUtils";
import { processUtils } from "../util/processUtils";

const logger = credentialLogger("AzurePowerShellCredential");

/**
 * Formats a command based on the platform executing it.
 * @internal
 */
export function formatCommand(commandName: string): string {
  if (process.platform === "win32") {
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
async function runCommands(commands: string[][]): Promise<string[]> {
  const results: string[] = [];

  try {
    for (const command of commands) {
      const [file, ...parameters] = command;
      const buffer = await processUtils.execFile(file, parameters);
      results.push(buffer.toString("utf-8"));
    }
  } catch (e) {
    throw new Error(e.toString("utf-8"));
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
    "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
};

/**
 * Messages to use when throwing in this credential.
 * @internal
 */
export const powerShellPublicErrorMessages = {
  login:
    "Please run 'Connect-AzAccount' from powershell to authenticate before using this credential.",
  installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install - Module - Name Az - Scope CurrentUser - Repository PSGallery - Force".`
};

// PowerShell Azure User not logged in error check.
const isLoginError = (err: Error) => err.message.match(`(.*)${powerShellErrors.login}(.*)`);

// Az Module not Installed in Azure PowerShell check.
const isNotInstallError = (err: Error) => err.message.match(powerShellErrors.installed);

/**
 * Optional parameters for the {@link AzurePowerShellCredential} class.
 */
export interface AzurePowerShellCredentialOptions {
  /**
   * If specified, this credential will use the legacy `powershell` command instead of the newest `pwsh`.
   */
  useLegacyPowerShell?: boolean;
}

/**
 * This credential will use the currently logged-in user login information via the Azure Power Shell command line tool.
 * To do so, it will read the user access token and expire time with Azure Power Shell command `Get-AzAccessToken -ResourceUrl {ResourceScope}`.
 * To be able to use this credential, ensure that:
 * - Install the Azure Az PowerShell module with: `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
 * - You have already logged in via the 'az' tool using the command "Connect-AzAccount" from the command line.
 */
export class AzurePowerShellCredential implements TokenCredential {
  private readonly powerShellCommand: string;

  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param useLegacyPowerShell - The flag indicating if legacy powershell should be used for authentication.
   */
  constructor(options?: AzurePowerShellCredentialOptions) {
    if (options?.useLegacyPowerShell) {
      this.powerShellCommand = formatCommand("powershell");
    } else {
      this.powerShellCommand = formatCommand("pwsh");
    }
  }
  /**
   * Gets the access token from Azure Power Shell
   * @param resource - The resource to use when getting the token
   */
  private async getAzurePowerShellAccessToken(
    resource: string
  ): Promise<{ Token: string; ExpiresOn: string }> {
    try {
      await runCommands([[this.powerShellCommand, "-v"]]);
    } catch (e) {
      throw new Error(
        `Unable to execute "${this.powerShellCommand}". Ensure that it is installed in your system.`
      );
    }

    const results = await runCommands([
      [
        this.powerShellCommand,
        "-Command",
        "Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru"
      ],
      [
        this.powerShellCommand,
        "-Command",
        `Get-AzAccessToken -ResourceUrl "${resource}" | ConvertTo-Json`
      ]
    ]);

    const result = results[1];
    try {
      return JSON.parse(result);
    } catch (e) {
      throw new Error(`Unable to parse the output of PowerShell. Received output: ${result}`);
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful. If authentication cannot be performed at this time, this method may
   * return null. If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    return trace(`${this.constructor.name}.getToken`, options, async () => {
      const scope = typeof scopes === "string" ? scopes : scopes[0];

      logger.getToken.info(`Using the scope ${scope}`);

      ensureValidScope(scope, logger);
      const resource = getScopeResource(scope);

      try {
        const response = await this.getAzurePowerShellAccessToken(resource);
        logger.getToken.info(formatSuccess(scopes));
        return {
          token: response.Token,
          expiresOnTimestamp: new Date(response.ExpiresOn).getTime()
        };
      } catch (err) {
        if (isNotInstallError(err)) {
          const error = new CredentialUnavailableError(powerShellPublicErrorMessages.installed);
          logger.getToken.info(formatError(scope, error));
          throw error;
        } else if (isLoginError(err)) {
          const error = new CredentialUnavailableError(powerShellPublicErrorMessages.login);
          logger.getToken.info(formatError(scope, error));
          throw error;
        }
        const error = new CredentialUnavailableError(err);
        logger.getToken.info(formatError(scope, error));
        throw error;
      }
    });
  }
}
