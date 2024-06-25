// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";

import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { credentialLogger } from "../../util/logging";
import { handleMsalError } from "../utils";
import { hasNativeBroker } from "./msalPlugins";
import open from "open";

/**
 * Options that can be passed to configure MSAL to handle authentication through opening a browser window.
 * @internal
 */
export interface MsalOpenBrowserOptions extends MsalNodeOptions {
  redirectUri?: string;
  loginHint?: string;
  browserCustomizationOptions?: {
    errorMessage?: string;
    successMessage?: string;
  };
}

/**
 * A call to open(), but mockable
 * @internal
 */
export const interactiveBrowserMockable = {
  open,
};

/**
 * This MSAL client sets up a web server to listen for redirect callbacks, then calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`
 * to trigger the authentication flow, and then respond based on the values obtained from the redirect callback
 * @internal
 */
export class MsalOpenBrowser extends MsalNode {
  private loginHint?: string;
  private errorTemplate?: string;
  private successTemplate?: string;
  private useDefaultBrokerAccount?: boolean;

  constructor(options: MsalOpenBrowserOptions) {
    super(options);
    this.loginHint = options.loginHint;
    this.errorTemplate = options.browserCustomizationOptions?.errorMessage;
    this.successTemplate = options.browserCustomizationOptions?.successMessage;
    this.logger = credentialLogger("Node.js MSAL Open Browser");
    this.useDefaultBrokerAccount =
      options.brokerOptions?.enabled && options.brokerOptions?.useDefaultBrokerAccount;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {},
  ): Promise<AccessToken> {
    try {
      const interactiveRequest: msalNode.InteractiveRequest = {
        openBrowser: async (url) => {
          await interactiveBrowserMockable.open(url, { wait: true, newInstance: true });
        },
        scopes,
        authority: options?.authority,
        claims: options?.claims,
        correlationId: options?.correlationId,
        loginHint: this.loginHint,
        errorTemplate: this.errorTemplate,
        successTemplate: this.successTemplate,
      };

      if (hasNativeBroker() && this.enableBroker) {
        return this.doGetBrokeredToken(scopes, interactiveRequest, {
          enableCae: options.enableCae,
          useDefaultBrokerAccount: this.useDefaultBrokerAccount,
        });
      }

      // If the broker is not enabled, we will fall back to interactive authentication

      if (hasNativeBroker() && !this.enableBroker) {
        this.logger.verbose(
          "Authentication will resume normally without the broker, since it's not enabled",
        );
      }

      const result = await this.getApp("public", options?.enableCae).acquireTokenInteractive(
        interactiveRequest,
      );
      return this.handleResult(scopes, result || undefined);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }

  /**
   * A helper function that supports brokered authentication through the MSAL's public application.
   *
   * When options.useDefaultBrokerAccount is true, the method will attempt to authenticate using the default broker account.
   * If the default broker account is not available, the method will fall back to interactive authentication.
   */
  private async doGetBrokeredToken(
    scopes: string[],
    interactiveRequest: msalNode.InteractiveRequest,
    options: {
      enableCae?: boolean;
      useDefaultBrokerAccount?: boolean;
    },
  ): Promise<AccessToken> {
    this.logger.verbose("Authentication will resume through the broker");
    if (this.parentWindowHandle) {
      interactiveRequest.windowHandle = Buffer.from(this.parentWindowHandle);
    } else {
      // error should have been thrown from within the constructor of InteractiveBrowserCredential
      this.logger.warning(
        "Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.",
      );
    }

    if (this.enableMsaPassthrough) {
      (interactiveRequest.tokenQueryParameters ??= {})["msal_request_type"] =
        "consumer_passthrough";
    }

    if (options.useDefaultBrokerAccount) {
      interactiveRequest.prompt = "none";
      this.logger.verbose("Attempting broker authentication using the default broker account");
    } else {
      interactiveRequest.prompt = undefined;
      this.logger.verbose("Attempting broker authentication without the default broker account");
    }

    try {
      const result = await this.getApp("public", options?.enableCae).acquireTokenInteractive(
        interactiveRequest,
      );
      if (result.fromNativeBroker) {
        this.logger.verbose(`This result is returned from native broker`);
      }
      return this.handleResult(scopes, result || undefined);
    } catch (e: any) {
      this.logger.verbose(`Failed to authenticate through the broker: ${e.message}`);
      // If we tried to use the default broker account and failed, fall back to interactive authentication
      if (options.useDefaultBrokerAccount) {
        return this.doGetBrokeredToken(scopes, interactiveRequest, {
          enableCae: options.enableCae,
          useDefaultBrokerAccount: false,
        });
      } else {
        // If we're not using the default broker account, throw the error
        throw handleMsalError(scopes, e);
      }
    }
  }
}
