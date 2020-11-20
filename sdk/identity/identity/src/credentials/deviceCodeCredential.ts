// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-http";
import { AuthenticationRequired, MsalClient } from "../client/msalClient";
import { createSpan } from "../util/tracing";
import { credentialLogger, formatError, formatSuccess } from "../util/logging";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";
import { TokenCredentialOptions } from "../client/identityClient";

import { DeviceCodeRequest } from "@azure/msal-node";
import { checkTenantId } from "../util/checkTenantId";
import { DeveloperSignOnClientId } from "../constants";

/**
 * Provides the user code and verification URI where the code must be
 * entered.  Also provides a message to display to the user which
 * contains an instruction with these details.
 */
export interface DeviceCodeInfo {
  /**
   * The device code that the user must enter into the verification page.
   */
  userCode: string;

  /**
   * The verification URI to which the user must navigate to enter the device
   * code.
   */
  verificationUri: string;

  /**
   * A message that may be shown to the user to instruct them on how to enter
   * the device code in the page specified by the verification URI.
   */
  message: string;
}

/**
 * Defines the signature of a callback which will be passed to
 * DeviceCodeCredential for the purpose of displaying authentication
 * details to the user.
 */
export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;

const logger = credentialLogger("DeviceCodeCredential");

/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo The device code.
 */
export function defaultDeviceCodePromptCallback(deviceCodeInfo: DeviceCodeInfo): void {
  console.log(deviceCodeInfo.message);
}

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
  private userPromptCallback: DeviceCodePromptCallback;
  private msalClient: MsalClient;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name.
   *                 The default value is 'organizations'.
   *                 'organizations' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   *                 By default we will try to use the Azure CLI's client ID to authenticate.
   * @param userPromptCallback A callback function that will be invoked to show
                               {@link DeviceCodeInfo} to the user. If left unassigned, we will automatically log the device code information and the authentication instructions in the console.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string = "organizations",
    clientId: string = DeveloperSignOnClientId,
    userPromptCallback: DeviceCodePromptCallback = defaultDeviceCodePromptCallback,
    options?: TokenCredentialOptions
  ) {
    checkTenantId(logger, tenantId);

    this.userPromptCallback = userPromptCallback;

    let authorityHost;
    if (options && options.authorityHost) {
      if (options.authorityHost.endsWith("/")) {
        authorityHost = options.authorityHost + tenantId;
      } else {
        authorityHost = options.authorityHost + "/" + tenantId;
      }
    } else {
      authorityHost = "https://login.microsoftonline.com/" + tenantId;
    }

    this.msalClient = new MsalClient(
      { clientId: clientId, authority: authorityHost },
      false,
      undefined,
      options
    );
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
  async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("DeviceCodeCredential-getToken", options);

    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    const deviceCodeRequest = {
      deviceCodeCallback: this.userPromptCallback,
      scopes: scopeArray
    };

    logger.info(`DeviceCodeCredential invoked. Scopes: ${scopeArray.join(", ")}`);

    return this.msalClient.acquireTokenFromCache(scopeArray).catch(async (e) => {
      if (e instanceof AuthenticationRequired) {
        try {
          const token = await this.acquireTokenByDeviceCode(deviceCodeRequest, scopeArray);
          logger.getToken.info(formatSuccess(scopeArray));
          return token;
        } catch (err) {
          const code =
            err.name === AuthenticationErrorName
              ? CanonicalCode.UNAUTHENTICATED
              : CanonicalCode.UNKNOWN;
          span.setStatus({
            code,
            message: err.message
          });
          logger.getToken.info(formatError(scopeArray, err));
          throw err;
        } finally {
          span.end();
        }
      } else {
        throw e;
      }
    });
  }

  private async acquireTokenByDeviceCode(
    deviceCodeRequest: DeviceCodeRequest,
    scopes: string[]
  ): Promise<AccessToken | null> {
    try {
      const deviceResponse = await this.msalClient.acquireTokenByDeviceCode(deviceCodeRequest);
      const expiresOnTimestamp = deviceResponse.expiresOn.getTime();
      logger.getToken.info(formatSuccess(scopes));
      return {
        expiresOnTimestamp,
        token: deviceResponse.accessToken
      };
    } catch (error) {
      throw new Error(`Device Authentication Error "${JSON.stringify(error)}"`);
    }
  }
}
