// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultKeysIdentifier {
  /**
   * The originally received identifier.
   */
  sourceId: string;

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
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
