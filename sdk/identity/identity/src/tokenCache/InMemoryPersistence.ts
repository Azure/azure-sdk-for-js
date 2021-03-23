// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalCommon from "@azure/msal-common";
import { CachePlugin } from "./types";

/**
 * IMPORTANT:
 * Do not use this outside the Identity source.
 * Do not instantiate this more than once per credential instance.
 */

/**
 * To allow silent authentications on the same credential, we provide a very simple in memory token cache.
 * It can't be used to re-use the account information returned from the authenticate() method.
 * @internal
 */
export function inMemoryPersistence(): { register(): Promise<CachePlugin> } {
  let inMemoryCache: string = "";

  return {
    async register(): Promise<CachePlugin> {
      return {
        beforeCacheAccess: async (
          tokenCacheContext: msalCommon.TokenCacheContext
        ): Promise<void> => {
          if (inMemoryCache) {
            tokenCacheContext.tokenCache.deserialize(inMemoryCache);
          } else {
            inMemoryCache = tokenCacheContext.tokenCache.serialize();
          }
        },
        afterCacheAccess: async (
          tokenCacheContext: msalCommon.TokenCacheContext
        ): Promise<void> => {
          if (tokenCacheContext.cacheHasChanged) {
            inMemoryCache = tokenCacheContext.tokenCache.serialize();
          }
        }
      };
    }
  };
}
