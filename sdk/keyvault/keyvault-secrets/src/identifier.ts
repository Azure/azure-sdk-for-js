// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault Secrets identifier and its parsed contents.
 */
export interface ParsedKeyVaultSecretsIdentifier {
  /**
   * The originally received identifier.
   */
  sourceId: string;

  /**
   * The Key Vault Secret unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Secret. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Secret.
   */
  name: string;
}

/**
 * Parses a KeyVaultIdentifier from a string URI.
 */
export function parseKeyVaultSecretsIdentifier(id: string): ParsedKeyVaultSecretsIdentifier {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
