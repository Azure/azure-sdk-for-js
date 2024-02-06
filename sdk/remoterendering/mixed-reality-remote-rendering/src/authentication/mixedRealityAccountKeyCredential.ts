// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, KeyCredential, TokenCredential } from "@azure/core-auth";

const maxTimestampMs = 8640000000000000;

/**
 * Represents an object used for Mixed Reality account key authentication.
 * @internal
 */
export class MixedRealityAccountKeyCredential implements TokenCredential {
  private readonly accountKey: KeyCredential;

  /**
   * Creates an instance of a MixedRealityAccountKeyCredential.
   * @param accountId - The Mixed Reality service account identifier.
   * @param accountKey - The Mixed Reality service account primary or secondary key.
   */
  constructor(public readonly accountId: string, accountKey: string | KeyCredential) {
    if (typeof accountKey === "string") {
      this.accountKey = { key: accountKey };
    } else {
      this.accountKey = accountKey;
    }
  }

  /**
   * Gets the token provided by this credential.
   *
   * This method is called automatically by Azure SDK client libraries. You may call this method
   * directly, but you must also handle token caching and token refreshing.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    const result: AccessToken = {
      expiresOnTimestamp: maxTimestampMs,
      token: `${this.accountId}:${this.accountKey.key}`,
    };

    return Promise.resolve(result);
  }
}
