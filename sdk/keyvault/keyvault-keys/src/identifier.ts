// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Valid collection names for Key Vault Key identifiers.
 */
export type KeyVaultKeysIdentifierCollectionName = "keys" | "deletedkeys";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultKeysIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultKeysIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Key unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Key. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Key.
   */
  name: string;
}

/**
 * Parses a KeyVaultIdentifier from a string URI.
 */
export function parseKeyVaultKeysIdentifier(id: string): ParsedKeyVaultKeysIdentifier {
  const urlParts = id.split("/");
  const collection: KeyVaultKeysIdentifierCollectionName = urlParts[3] as KeyVaultKeysIdentifierCollectionName;

  const collections: KeyVaultKeysIdentifierCollectionName[] = ["keys", "deletedkeys"];

  if (!collections.includes(collection)) {
    throw new Error(`The only collections allowed are: ${collections.join(", ")}`);
  }

  return {
    collection,
    id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
