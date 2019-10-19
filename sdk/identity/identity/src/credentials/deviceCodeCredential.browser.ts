// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { DeviceCodePromptCallback } from './deviceCodeCredential';
import { DeviceCodeCredentialOptions } from './deviceCodeCredentialOptions';

const BrowserNotSupportedError = new Error("DeviceCodeCredential is not supported in the browser.");

export class DeviceCodeCredential implements TokenCredential {
  constructor(
    clientId: string,
    userPromptCallback: DeviceCodePromptCallback,
    options?: DeviceCodeCredentialOptions
  ) {
    throw BrowserNotSupportedError;
  }

  public getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    throw BrowserNotSupportedError;
  }
}
