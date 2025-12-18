// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

/**
 * Creates a mock credential for testing purposes
 */
export function createMockCredential(): TokenCredential {
  return {
    async getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {
      return {
        token: "mock-token-for-testing",
        expiresOnTimestamp: Date.now() + 3600000, // 1 hour from now
      };
    },
  };
}
