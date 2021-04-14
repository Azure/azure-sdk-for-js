// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialUnavailableError } from "../client/errors";
import { msalPersistencePlatforms, TokenCachePersistenceOptions } from "./persistencePlatforms";
import {
  isNode8,
  Node8NotSupportedError,
  requireMsalNodeExtensions
} from "./requireMsalNodeExtensions";
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

    let extensions: any;
    try {
      extensions = requireMsalNodeExtensions();
    } catch (e) {
      throw new CredentialUnavailableError(
        "To use the token cache persistence feature, please install the package '@azure/msal-node-extensions@1.0.0-alpha.6'."
      );
    }

    if (isNode8) {
      throw Node8NotSupportedError;
    } else {
      const { PersistenceCachePlugin } = extensions;

      const persistence = await this.getPersistence();
      if (!persistence) {
        throw new Error("No persistence implementations available.");
      }

      return new PersistenceCachePlugin(persistence, lockOptions);
    }
  }
}
