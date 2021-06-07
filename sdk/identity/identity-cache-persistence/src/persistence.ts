// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ICachePlugin as CachePlugin } from "@azure/msal-node";
import { PersistenceCachePlugin } from "@azure/msal-node-extensions";

import { TokenCachePersistenceOptions } from "@azure/identity";

import { msalPersistencePlatforms } from "./persistencePlatforms";

export async function createPersistenceCachePlugin(
  options?: TokenCachePersistenceOptions
): Promise<CachePlugin> {
  const persistence = await msalPersistencePlatforms[process.platform]?.(options ?? {});

  if (persistence === undefined) {
    throw new Error("no persistence providers are available on this platform");
  }

  return new PersistenceCachePlugin(persistence, {
    retryNumber: 100,
    retryDelay: 50
  });
}
