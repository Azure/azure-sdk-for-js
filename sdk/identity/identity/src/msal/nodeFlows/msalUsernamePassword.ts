// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalNode from "@azure/msal-node";
import { AccessToken } from "@azure/core-auth";

import { MsalNodeOptions, MsalNode } from "./msalNodeCommon";
import { CredentialFlowGetTokenOptions } from "../credentials";

/**
 * Options that can be passed to configure MSAL to handle authentication through username and password.
 * @internal
 */
export interface MSALUsernamePasswordOptions extends MsalNodeOptions {
  username: string;
  password: string;
}

/**
 * MSAL username and password client. Calls to the MSAL's public application's `acquireTokenByUsernamePassword` during `doGetToken`.
 * @internal
 */
export class MsalUsernamePassword extends MsalNode {
  private username: string;
  private password: string;

  constructor(options: MSALUsernamePasswordOptions) {
    super(options);
    this.username = options.username;
    this.password = options.password;
  }

  protected async doGetToken(
    scopes: string[],
    options?: CredentialFlowGetTokenOptions
  ): Promise<AccessToken> {
    try {
      const requestOptions: msalNode.UsernamePasswordRequest = {
        scopes,
        username: this.username,
        password: this.password,
        correlationId: options?.correlationId,
        authority: options?.authority,
        claims: options?.claims,
      };
      const result = await this.publicApp!.acquireTokenByUsernamePassword(requestOptions);
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (error) {
      throw this.handleError(scopes, error, options);
    }
  }
}
