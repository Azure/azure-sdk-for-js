// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName, CredentialUnavailable } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";

const logger = credentialLogger("AzurePowerShellCredential");

/**
 * This credential will use the currently logged-in user login information
 * via the Azure Power Shell commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure Power Shell command "Get-AzAccessToken -ResourceUrl {ResourceScope}.
 * To be able to use this credential, ensure that you have already logged
 * in via the 'az' tool using the command "Connect-AzAccount" from the commandline.
 */
export class AzurePowerShellCredential implements TokenCredential {

  private useLegacyPowerShell: boolean;

    /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param useLegacyPowerShell The flag indicating if legacy powershell should be used for authentication.
   */
  constructor(
    useLegacyPowerShell: boolean
  ) {
    this.useLegacyPowerShell = useLegacyPowerShell;
  }
  /**
   * Gets the access token from Azure Power Shell
   * @param resource The resource to use when getting the token
   */
  protected async getAzurePowerShellAccessToken(resource: string) {
    return new Promise((resolve, reject) => {

      //Add calls to get token from Azure Power shell via node-powershell library.
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
      const scope = typeof scopes === "string" ? scopes : scopes[0];
      logger.getToken.info(`Using the scope ${scope}`);

      const resource = scope.replace(/\/.default$/, "");

      // Check to make sure the scope we get back is a valid scope
      if (!scope.match(/^[0-9a-zA-Z-.:/]+$/)) {
        const error = new Error("Invalid scope was specified by the user or calling client");
        logger.getToken.info(formatError(error));
        throw error;
      }

      let responseData = "";

      const { span } = createSpan("AzurePowerShellCredential-getToken", options);
      this.getAzurePowerShellAccessToken(resource)
        .then((obj: any) => {
          if (obj.stderr) {
            const isLoginError = obj.stderr.match("(.*)Run Connect-AzAccount to login(.*)");
            const isNotInstallError =
              obj.stderr.match("The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory")  
            if (isNotInstallError) {
              const error = new CredentialUnavailable(
                "Az.Account module >= 2.2.0 is not installed."
              );
              logger.getToken.info(formatError(error));
              throw error;
            } else if (isLoginError) {
              const error = new CredentialUnavailable(
                "Please run 'az login' from a command prompt to authenticate before using this credential."
              );
              logger.getToken.info(formatError(error));
              throw error;
            }
            const error = new CredentialUnavailable(obj.stderr);
            logger.getToken.info(formatError(error));
            throw error;
          } else {
            responseData = obj.stdout;
            const response: { Token: string; ExpiresOn: string } = JSON.parse(responseData);
            logger.getToken.info(formatSuccess(scopes));
            const returnValue = {
              token: response.Token,
              expiresOnTimestamp: new Date(response.ExpiresOn).getTime()
            };
            resolve(returnValue);
            return returnValue;
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
          logger.getToken.info(formatError(err));
          reject(err);
        });
    });
  }
}
