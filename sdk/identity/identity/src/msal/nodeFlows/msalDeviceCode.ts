// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import { AccessToken } from "@azure/core-http";
import { DeviceCodePromptCallback } from "../../credentials/deviceCodeCredentialOptions";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";

/**
 * Options that can be passed to configure MSAL to handle authentication through device codes.
 * @internal
 */
export interface MSALDeviceCodeOptions extends MsalNodeOptions {
  userPromptCallback: DeviceCodePromptCallback;
}

/**
 * MSAL device code client. Calls to the MSAL's public application's `acquireTokenByDeviceCode` during `doGetToken`.
 * @internal
 */
export class MsalDeviceCode extends MsalNode {
  private userPromptCallback: DeviceCodePromptCallback;

  constructor(options: MSALDeviceCodeOptions) {
    super(options);
    this.userPromptCallback = options.userPromptCallback;
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    try {
      const requestOptions: msalNode.DeviceCodeRequest = {
        deviceCodeCallback: this.userPromptCallback,
        scopes,
        cancel: false,
        correlationId: options?.correlationId
      };
      const promise = this.publicApp!.acquireTokenByDeviceCode(requestOptions);
      // TODO:
      // This should work, but it currently doesn't. I'm waiting for an answer from the MSAL team.
      const deviceResponse = await this.withCancellation(promise, options?.abortSignal, () => {
        requestOptions.cancel = true;
      });
      return this.handleResult(scopes, this.clientId, deviceResponse || undefined);
    } catch (error) {
      throw this.handleError(scopes, error, options);
    }
  }
}
