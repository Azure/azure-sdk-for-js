// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

import { AzureKeyCredential } from "@azure/core-auth";

export class MixedRealityAccountKeyCredential implements TokenCredential {
  private accountId: string;
  private accountKey: AzureKeyCredential;

  /// <summary>
  /// Initializes a new instance of the <see cref="MixedRealityAccountKeyCredential" /> class.
  /// </summary>
  /// <param name="accountId">The Mixed Reality service account identifier.</param>
  /// <param name="accountKey">The Mixed Reality service account primary or secondary key.</param>
  constructor(accountId: string, accountKey: AzureKeyCredential) {
    this.accountId = accountId;
    this.accountKey = accountKey;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    return new Promise((resolve, _reject) => (resolve({
      token: this.accountId + ":" + this.accountKey,
      expiresOnTimestamp: Number.MAX_VALUE
    })));
  }
}
