// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { credentialLogger } from "../util/logging";
import { MsalDeviceCode } from "../msal/nodeFlows/msalDeviceCode";
import { MsalFlow } from "../msal/flows";
import { trace } from "../util/tracing";
import {
  DeviceCodeCredentialOptions,
  DeviceCodeInfo,
  DeviceCodePromptCallback
} from "./deviceCodeCredentialOptions";

const logger = credentialLogger("DeviceCodeCredential");

/**
 * Method that logs the user code from the DeviceCodeCredential.
 * @param deviceCodeInfo - The device code.
 */
export function defaultDeviceCodePromptCallback(deviceCodeInfo: DeviceCodeInfo): void {
  console.log(deviceCodeInfo.message);
}

/**
 * Enables authentication to Azure Active Directory using a device code
 * that the user can enter into https://microsoft.com/devicelogin.
 */
export class DeviceCodeCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param options - Options for configuring the client which makes the authentication requests.
   */
  constructor(
    tenantId?: string,
    clientId?: string,
    userPromptCallback?: DeviceCodePromptCallback,
    options?: DeviceCodeCredentialOptions
  ) {
    this.msalFlow = new MsalDeviceCode({
      ...options,
      tenantId,
      clientId,
      logger,
      userPromptCallback: userPromptCallback || defaultDeviceCodePromptCallback,
      tokenCredentialOptions: options || {}
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * If the user provided the option `disableAutomaticAuthentication`,
   * once the token can't be retrieved silently,
   * this method won't attempt to request user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
