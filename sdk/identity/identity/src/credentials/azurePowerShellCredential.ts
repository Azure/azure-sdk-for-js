// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as childProcess from "child_process";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { CredentialUnavailableError } from "../client/errors";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
import { trace } from "../util/tracing";

const logger = credentialLogger("AzurePowerShellCredential");

/**
 * Formats a command based on the platform executing it.
 * @internal
 */
function formatCommand(commandName: string) {
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
function runCommands([firstCommand, ...commands]: string[]): string[] {
  const output: string[] = [];
  const error: string[] = [];

  // The first command can contain parameters.
  const [firstCommandHead, ...firstCommandParams] = firstCommand.split(" ");
  const child = childProcess.spawn(firstCommandHead, firstCommandParams);

  child.stdout.on("data", function(data) {
    output.push(data.toString());
  });
  child.stderr.on("data", function(data) {
    error.push(data.toString());
  });

  commands.forEach(function(cmd) {
    child.stdin.write(cmd + "\n");
  });

  // Throws the first error received
  if (error.length) {
    throw new Error(error[0]);
  }

  return output;
}

/**
 * This credential will use the currently logged-in user login information
 * via the Azure Power Shell commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure Power Shell command `Get-AzAccessToken -ResourceUrl {ResourceScope}`.
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "Connect-AzAccount" from the commandline.
 */
export class AzurePowerShellCredential implements TokenCredential {
  private useLegacyPowerShell: boolean;

  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param useLegacyPowerShell - The flag indicating if legacy powershell should be used for authentication.
   */
  constructor(useLegacyPowerShell: boolean = false) {
    this.useLegacyPowerShell = useLegacyPowerShell;
  }
  /**
   * Gets the access token from Azure Power Shell
   * @param resource - The resource to use when getting the token
   */
  protected async getAzurePowerShellAccessToken(
    resource: string
  ): Promise<{ Token: string; ExpiresOn: string }> {
    let firstCommand: string;

    if (this.useLegacyPowerShell) {
      firstCommand = `${formatCommand("powershell")} -Command -`;
    } else {
      firstCommand = `${formatCommand("pwsh")} -Command -`;
    }

    const output = runCommands([
      firstCommand,
      "Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru",
      `Get-AzAccessToken -ResourceUrl "${resource}" | ConvertTo-Json"`
    ]);

    return JSON.parse(output[1]);
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
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

      const resource = scope.replace(/\/.default$/, "");

      // Check to make sure the scope we get back is a valid scope
      if (!scope.match(/^[0-9a-zA-Z-.:/]+$/)) {
        const error = new Error("Invalid scope was specified by the user or calling client");
        logger.getToken.info(formatError(scope, error));
        throw error;
      }

      try {
        const response = await this.getAzurePowerShellAccessToken(resource);
        logger.getToken.info(formatSuccess(scopes));
        const returnValue = {
          token: response.Token,
          expiresOnTimestamp: new Date(response.ExpiresOn).getTime()
        };
        return returnValue;
      } catch (err) {
        console.log({ err });

        // PowerShell Azure User not logged in error check.
        const isLoginError = err.message.match("(.*)Run Connect-AzAccount to login(.*)");

        // Az Module not Installed in Azure PowerShell check.
        const isNotInstallError = err.message.match(
          "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
        );
        if (isNotInstallError) {
          const error = new CredentialUnavailableError(
            "Az.Account module >= 2.2.0 is not installed."
          );
          logger.getToken.info(formatError(scope, error));
          throw error;

          // Azure user not logged in check in Azure Power Shell.
        } else if (isLoginError) {
          const error = new CredentialUnavailableError(
            "Please run 'az login' from a command prompt to authenticate before using this credential."
          );
          logger.getToken.info(formatError(scope, error));
          throw error;
        }
        const error = new CredentialUnavailableError(err);
        logger.getToken.info(formatError(scope, error));
        throw error;

        // const code =
        //   err.name === AuthenticationErrorName
        //     ? CanonicalCode.UNAUTHENTICATED
        //     : CanonicalCode.UNKNOWN;
        // span.setStatus({
        //   code,
        //   message: err.message
        // });
        // logger.getToken.info(formatError(err));
        // throw err;
      }
    });
  }
}
