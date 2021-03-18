// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { credentialLogger } from "../util/logging";
import { MsalDeviceCode } from "../msal/nodeFlows/msalDeviceCode";
import { MsalFlow } from "../msal/flows";
import { AuthenticationRecord } from "../msal/types";
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
  private disableAutomaticAuthentication?: boolean;

  /**
   * Creates an instance of DeviceCodeCredential with the details needed
   * to initiate the device code authorization flow with Azure Active Directory.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
   *                   The default value is 'organizations'.
   *                   'organizations' may be used when dealing with multi-tenant scenarios.
   *                   Users can also pass the options as the first parameter, and skip the other parammeters entirely.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   *                   By default we will try to use the Azure CLI's client ID to authenticate.
   * @param userPromptCallback - A callback function that will be invoked to show
   *                             {@link DeviceCodeInfo} to the user. If left unassigned, we will automatically log the device code information and the authentication instructions in the console.
   * @param options - Options for configuring the client which makes the authentication requests.
   */
  constructor(options?: DeviceCodeCredentialOptions);
  constructor(
    tenantId?: string,
    clientId?: string,
    userPromptCallback?: DeviceCodePromptCallback,
    options?: DeviceCodeCredentialOptions
  );
  constructor(
    tenantIdOrOptions?: string | DeviceCodeCredentialOptions,
    clientId?: string,
    userPromptCallback?: DeviceCodePromptCallback,
    options?: DeviceCodeCredentialOptions
  ) {
    let tenantId: string | undefined;
    if (typeof tenantIdOrOptions === "string") {
      tenantId = tenantIdOrOptions;
    } else {
      options = tenantIdOrOptions;
    }
    this.msalFlow = new MsalDeviceCode({
      ...options,
      logger,
      clientId,
      tenantId,
      userPromptCallback: userPromptCallback || defaultDeviceCodePromptCallback,
      tokenCredentialOptions: options || {}
    });
    this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
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
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = typeof scopes === "object" ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, {
        ...newOptions,
        disableAutomaticAuthentication: this.disableAutomaticAuthentication
      });
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * If the token can't be retrieved silently, this method will require user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  async authenticate(
    scopes: string | string[],
    options: GetTokenOptions = {}
  ): Promise<AuthenticationRecord | undefined> {
    return trace(`${this.constructor.name}.authenticate`, options, async (newOptions) => {
      const arrayScopes = typeof scopes === "object" ? scopes : [scopes];
      await this.msalFlow.getToken(arrayScopes, newOptions);
      return this.msalFlow.getActiveAccount();
    });
  }
}
