// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions } from '../client/identityClient';
import * as keytar from 'keytar';

export class VSCodeCredential implements TokenCredential {
  constructor(
    options?: TokenCredentialOptions
  ) {
    //throw BrowserNotSupportedError;
  }

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let token = await keytar.findPassword("VS Code Azure");
    if (token) {
      return { token, expiresOnTimestamp: Date.now() + 2 * 60 * 1000 }
    } else {
      return null;
    }
  }
}
