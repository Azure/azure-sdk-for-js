// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCachePersistenceOptions } from "./persistencePlatforms";
import { MsalPersistence, CachePlugin, TokenCacheRegisterOptions } from "./types";

/**
 * TokenCachePersistence is not available for the browsers.
 * @internal
 */
export class TokenCachePersistence {
  constructor(_options: TokenCachePersistenceOptions = {}) {
    throw new Error("TokenCachePersistence is not available in the browser");
  }

  async getPersistence(): Promise<MsalPersistence | undefined> {
    throw new Error("TokenCachePersistence is not available in the browser");
  }

  async register(_options?: TokenCacheRegisterOptions): Promise<CachePlugin> {
    throw new Error("TokenCachePersistence is not available in the browser");
  }
}
