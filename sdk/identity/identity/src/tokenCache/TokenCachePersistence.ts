// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PersistenceCachePlugin,
  IPersistence as MsalIPersistence
} from "@azure/msal-node-extensions";
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

    const persistence = await this.getPersistence();
    if (!persistence) {
      throw new Error("No persistence implementations available.");
    }

    return new PersistenceCachePlugin(persistence as MsalIPersistence, lockOptions);
  }
}
