// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface TokenCacheRegisterOptions {}

/**
 * Custom definition of MSAL's MsalPersistence interface.
 * @internal
 */
export interface MsalPersistence {
  save(contents: string): Promise<void>;

  // Load returns Promise<string> on MsalPersistence,
  // but it returns Promise<string | null> on FilePersistenceWithDataProtection.
  load(): Promise<string | null>;

  delete(): Promise<boolean>;
  reloadNecessary(lastSync: number): Promise<boolean>;
  getFilePath(): string;

  // // Incompatible between MsalPersistence and FilePersistenceWithDataProtection
  // // Error says:
  // // Type 'Logger' is missing the following properties from type 'Logger': packageName, packageVersion, clone
  // getLogger(): Logger;
}

/**
 * Custom definition of MSAL's MsalCachePlugin interface.
 * @internal
 */
export interface CachePlugin {
  beforeCacheAccess: (tokenCacheContext: any) => Promise<void>;
  afterCacheAccess: (tokenCacheContext: any) => Promise<void>;
}

/**
 * A simple representation of the TokenCache.
 * @internal
 */
export interface TokenCache {
  register(_options?: TokenCacheRegisterOptions): Promise<CachePlugin>;
}
