// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * ===== Warning! =====
 *
 * It's important that this module does not contain any imports or exports.
 *
 * This file is referenced by the other identity packages, such as
 * identity-vscode and identity-cache-persistence, so any imports or exports here will
 * be dragged into those packages' depdendencies as well.
 */

// #region Global Extension Registry

/**
 * About this functionality:
 *
 * We needed a way to allow Identity packages to pass implementation objects
 * back and forth without adding those items to the public API surface of
 * the base identity package, so we are using a symbol-property of the global
 * object to store a map from symbols to implementations.
 *
 * This allows extension _providers_ to reference this file directly and to
 * register their extensions with the extension system while exporting only
 * a symbol from their package API. This allows those packages to utilize
 * MSAL/Identity internals without exposing those internals.
 */

export type AzureExtensionRegistry = Map<symbol, (context: AzureExtensionContext) => void>;

const registryKey: unique symbol = Symbol.for("__azure_identity_extensions");

const _glb: { [registryKey]: AzureExtensionRegistry } = (globalThis ?? global ?? window) as any;

export const registry: Map<symbol, (context: AzureExtensionContext) => void> =
  _glb[registryKey] ??
  (() => {
    const _registry = new Map();
    _glb[registryKey] = _registry;
    return _registry;
  })();

/**
 * This type is used for Azure Identity internals only.
 */
export interface AzureIdentityExtensionTypeMap {}

/**
 * The type of a symbol representing an Azure Identity Extension.
 */
export type IdentityExtension = keyof AzureIdentityExtensionTypeMap;

// #endregion

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

export interface PluginControl {
  persistence: (
    options?: TokenCachePersistenceOptions
  ) => Promise<import("@azure/msal-common").ICachePlugin>;
}
export interface AzureExtensionContext {
  cachePluginControl: PluginControl;
}

export function registerExtension(
  symbol: symbol,
  installer: (context: AzureExtensionContext) => void
): void {
  if (registry.has(symbol)) {
    throw new Error(
      `Attempted to register the same Azure Identity Extension twice: ${symbol.toString()}`
    );
  }

  registry.set(symbol, installer);
}
