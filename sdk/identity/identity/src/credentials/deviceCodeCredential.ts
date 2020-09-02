// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AccessToken, TokenCredential, GetTokenOptions, delay } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
import { createSpan } from "../util/tracing";
import { credentialLogger, formatSuccess } from "../util/logging";
import { AuthenticationError, AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";

import msal from "@azure/msal-node";

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
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private pca: msal.PublicClientApplication;
  private tenantId: string;
  private clientId: string;
  private userPromptCallback: DeviceCodePromptCallback;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID or name. 
   *                 'organizations' may be used when dealing with multi-tenant scenarios.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param userPromptCallback A callback function that will be invoked to show
                               {@link DeviceCodeInfo} to the user.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string | "organizations",
    clientId: string,
    userPromptCallback: DeviceCodePromptCallback,
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient(options);
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.userPromptCallback = userPromptCallback;

    const publicClientConfig = {
      auth: {
          clientId: this.clientId,
          authority: "https://login.microsoftonline.com/" + this.tenantId,
      },
      cache: {
          cachePlugin: undefined
      },
    };

    this.pca = new msal.PublicClientApplication(publicClientConfig);
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
  getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span, options: newOptions } = createSpan("DeviceCodeCredential-getToken", options);

    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    const deviceCodeRequest = {
      deviceCodeCallback: this.userPromptCallback,
      scopes: scopeArray,
    };

    logger.info("Sending devicecode request");

    try {
      return this.acquireTokenByDeviceCode(deviceCodeRequest);
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      logger.getToken.info(err);
      throw err;
    } finally {
      span.end();
    }
  }

  private async acquireTokenByDeviceCode(deviceCodeRequest: msal.DeviceCodeRequest): Promise<AccessToken | null> {
    try {
      const deviceResponse = await this.pca.acquireTokenByDeviceCode(deviceCodeRequest);
      return({
        expiresOnTimestamp: deviceResponse.expiresOn.getTime(),
        token: deviceResponse.accessToken
      });
    } catch (error) {
      throw new Error(`Device Authentication Error "${JSON.stringify(error)}"`);
    }
  }
}
