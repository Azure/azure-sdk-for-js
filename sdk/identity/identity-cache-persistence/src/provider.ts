// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalPersistenceOptions, msalPersistencePlatforms } from "./platforms";
import { IPersistence as Persistence, PersistenceCachePlugin } from "@azure/msal-node-extensions";
import { ICachePlugin as CachePlugin } from "@azure/msal-node";

/**
 * This is used to gain access to the underlying Persistence instance, which we use for testing
 *
 * @returns a raw persistence instance
 * @internal
 */
export async function createPersistence(options: MsalPersistenceOptions): Promise<Persistence> {
  const persistence = await msalPersistencePlatforms[process.platform]?.(options);

  if (persistence === undefined) {
    throw new Error("no persistence providers are available on this platform");
  }

  return persistence;
}

export async function createPersistenceCachePlugin(
  options?: MsalPersistenceOptions
): Promise<CachePlugin> {
  const persistence = await createPersistence(options ?? {});

  return new PersistenceCachePlugin(persistence, {
    retryNumber: 100,
    retryDelay: 50,
  });
}
