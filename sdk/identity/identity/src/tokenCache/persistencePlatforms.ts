// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable tsdoc/syntax */

import {
  DataProtectionScope,
  FilePersistence,
  FilePersistenceWithDataProtection,
  KeychainPersistence,
  LibSecretPersistence
} from "@azure/msal-node-extensions";
import { MsalPersistence } from "./types";
import * as path from "path";

/**
 * Local application data folder
 * Expected values:
 * - Darwin: '/Users/user/'
 * - Windows 8: 'C:\Users\user\AppData\Local'
 * - Windows XP: 'C:\Documents and Settings\user\Application Data\Local'
 * - Linux: '/home/user/.local/share'
 * @internal
 */
const localApplicationDataFolder = process.env.APPDATA
  ? process.env.APPDATA.replace(/(.Roaming)*$/, "\\Local")
  : (process.platform === "darwin" ? process.env.HOME : process.env.HOME)!;

/**
 * Dictionary of values that we use as default as we discover, pick and enable the persistence layer.
 * @internal
 */
export const defaultMsalValues = {
  tokenCache: {
    name: "msal.cache",
    // Expected values:
    // - Darwin: '/Users/user/.IdentityService'
    // - Windows 8: 'C:\Users\user\AppData\Local\.IdentityService'
    // - Windows XP: 'C:\Documents and Settings\user\Application Data\Local\.IdentityService'
    // - Linux: '/home/user/.IdentityService'
    directory: path.join(localApplicationDataFolder, ".IdentityService")
  },
  keyRing: {
    label: "MSALCache",
    schema: "msal.cache",
    collection: "default",
    attributes: {
      MsalClientID: "Microsoft.Developer.IdentityService",
      "Microsoft.Developer.IdentityService": "1.0.0.0"
    },
    service: "Microsoft.Developer.IdentityService",
    account: "MSALCache"
  },
  keyChain: {
    service: "Microsoft.Developer.IdentityService",
    account: "MSALCache"
  }
};

/**
 * Parameters that enable token cache persistence in the Identity credentials.
 */
export interface TokenCachePersistenceOptions {
  /**
   * Unique identifier for the persistent token cache.
   *
   * Based on this identifier, the persistence file will be located in any of the following places:
   * - Darwin: '/Users/user/.IdentityService/<name>'
   * - Windows 8: 'C:\Users\user\AppData\Local\.IdentityService\<name>'
   * - Windows XP: 'C:\Documents and Settings\user\Application Data\Local\.IdentityService\<name>'
   * - Linux: '/home/user/.IdentityService/<name>'
   */
  name?: string;
  /**
   * If set to true, the cache will be stored without encryption if no OS level user encryption is available.
   * When set to false, the PersistentTokenCache will throw an error if no OS level user encryption is available.
   */
  allowUnencryptedStorage?: boolean;
}

/**
 * The platforms we currently support.
 * @internal
 */
export type MsalPersistencePlatforms = "win32" | "darwin" | "linux";

/**
 * The common set of properties of all the persistence implementations we have.
 * @internal
 */
export interface MsalPersistenceImplementation {
  name: string;
  isAvailable(): boolean;
  /**
   * Returns the available persistance.
   * @param options Input options provided by the end user.
   */
  persistence(options?: TokenCachePersistenceOptions): Promise<MsalPersistence>;
}

/**
 * Expected responses:
 * - Darwin: '/Users/user/.IdentityService/<name>'
 * - Windows 8: 'C:\Users\user\AppData\Local\.IdentityService\<name>'
 * - Windows XP: 'C:\Documents and Settings\user\Application Data\Local\.IdentityService\<name>'
 * - Linux: '/home/user/.IdentityService/<name>'
 * @internal
 */
function getPersistencePath(name: string): string {
  return path.join(defaultMsalValues.tokenCache.directory, name);
}

/**
 * Set of the platforms we attempt to deliver persistence on.
 *
 * - On Windows we use DPAPI.
 * - On OSX (Darwin), we try to use the system's Keychain, otherwise if the property `allowUnencryptedStorage` is set to true, we use an unencrypted file.
 * - On Linux, we try to use the system's Keyring, otherwise if the property `allowUnencryptedStorage` is set to true, we use an unencrypted file.
 *
 * @internal
 */
export const msalPersistencePlatforms: Record<
  MsalPersistencePlatforms,
  MsalPersistenceImplementation
> = {
  win32: {
    name: "win32",
    isAvailable: () => process.platform === "win32",
    persistence: ({ name = defaultMsalValues.tokenCache.name } = {}) =>
      FilePersistenceWithDataProtection.create(
        getPersistencePath(name),
        DataProtectionScope.CurrentUser
      )
  },

  darwin: {
    name: "darwin",
    isAvailable: () => process.platform === "darwin",
    async persistence(options: TokenCachePersistenceOptions = {}): Promise<MsalPersistence> {
      const { name, allowUnencryptedStorage } = options;
      const { service, account } = defaultMsalValues.keyChain;
      const persistencePath = getPersistencePath(name || defaultMsalValues.tokenCache.name);

      try {
        const persistence = await KeychainPersistence.create(persistencePath, service, account);
        // If we don't encounter an error when trying to read from the keychain, then we should be good to go.
        await persistence.load();
        return persistence;
      } catch (e) {
        // If we got an error while trying to read from the keyring,
        // we will proceed only if the user has specified that unencrypted storage is allowed.
        if (!allowUnencryptedStorage) {
          throw new Error("MSAL was unable to read from the system's keyring.");
        }
        return FilePersistence.create(persistencePath);
      }
    }
  },

  linux: {
    name: "linux",
    isAvailable: () => process.platform === "linux",
    async persistence(options: TokenCachePersistenceOptions = {}): Promise<MsalPersistence> {
      const { name, allowUnencryptedStorage } = options;
      const { service, account } = defaultMsalValues.keyRing;
      const persistencePath = getPersistencePath(name || defaultMsalValues.tokenCache.name);

      try {
        const persistence = await LibSecretPersistence.create(persistencePath, service, account);
        // If we don't encounter an error when trying to read from the keyring, then we should be good to go.
        await persistence.load();
        return persistence;
      } catch (e) {
        // If we got an error while trying to read from the keyring,
        // we will proceed only if the user has specified that unencrypted storage is allowed.
        if (!allowUnencryptedStorage) {
          throw new Error("MSAL was unable to read from the system's keyring.");
        }
        return FilePersistence.create(persistencePath);
      }
    }
  }
};
