// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Valid collection names for Key Vault Secret identifiers.
 */
export type KeyVaultSecretsIdentifierCollectionName = "secrets" | "deletedsecrets";

/**
 * Represents a Key Vault Secrets identifier and its parsed contents.
 */
export interface ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultSecretsIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

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
  const collection: KeyVaultSecretsIdentifierCollectionName = urlParts[3] as KeyVaultSecretsIdentifierCollectionName;

  const collections: KeyVaultSecretsIdentifierCollectionName[] = ["secrets", "deletedsecrets"];

  if (!collections.includes(collection)) {
    throw new Error(`The only collections allowed are: ${collections.join(", ")}`);
  }

  return {
    collection,
    id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
