// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";

/**
 * `TokenCredential` implementation for playback.
 * If your regular AAD credentials don't take the recorder httpClient option, the AAD traffic won't be recorded.
 * In this case, you'll need to bypass the AAD requests with no-op.
 *
 * Using this NoOpCredential as your credential in playback mode would help you bypass the AAD traffic.
 */
export class NoOpCredential implements TokenCredential {
  getToken(): Promise<AccessToken> {
    return Promise.resolve({
      token: "SecretPlaceholder",
      expiresOnTimestamp: Date.now() + 86400 * 1000
    });
  }
}
