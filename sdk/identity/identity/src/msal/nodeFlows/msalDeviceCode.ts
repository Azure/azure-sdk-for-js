// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import { AccessToken } from "@azure/core-auth";

import { DeviceCodePromptCallback } from "../../credentials/deviceCodeCredentialOptions";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { MsalNodeOptions, MsalNode } from "./msalNodeCommon";

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
        correlationId: options?.correlationId,
        authority: options?.authority,
        claims: options?.claims,
      };
      const promise = this.publicApp!.acquireTokenByDeviceCode(requestOptions);
      const deviceResponse = await this.withCancellation(promise, options?.abortSignal, () => {
        requestOptions.cancel = true;
      });
      return this.handleResult(scopes, this.clientId, deviceResponse || undefined);
    } catch (error) {
      throw this.handleError(scopes, error, options);
    }
  }
}
