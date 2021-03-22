// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode15, isNode8, Node15NotSupportedError, Node8NotSupportedError } from "./nodeVersion";
import { msalPersistencePlatforms, TokenCachePersistenceOptions } from "./persistencePlatforms";
import { MsalPersistence, CachePlugin, TokenCacheRegisterOptions } from "./types";

/**
 * Determines which platform we can trust to deliver a persistence layer for MSAL,
 * and also provides a way to extract a CachePlugin that can be sent to MSAL through the MSAL applications' configurations.
 * @internal
 */
export class TokenCachePersistence {
  private options: TokenCachePersistenceOptions;

  constructor(options: TokenCachePersistenceOptions = {}) {
    this.options = options;
  }

  async getPersistence(): Promise<MsalPersistence | undefined> {
    const { win32, darwin, linux } = msalPersistencePlatforms;

    const availablePlatform = [win32, darwin, linux].find((platform) => platform.isAvailable());

    return availablePlatform?.persistence(this.options);
  }

  async register(_options?: TokenCacheRegisterOptions): Promise<CachePlugin> {
    const lockOptions = {
      retryNumber: 100,
      retryDelay: 50
    };

    if (isNode8 || isNode15) {
      throw isNode8 ? Node8NotSupportedError : Node15NotSupportedError;
    } else {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      const { PersistenceCachePlugin } = require("@azure/msal-node-extensions");

      const persistence = await this.getPersistence();
      if (!persistence) {
        throw new Error("No persistence implementations available.");
      }

      return new PersistenceCachePlugin(persistence, lockOptions);
    }
  }
}
