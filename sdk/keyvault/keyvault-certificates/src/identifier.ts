// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Valid collection names for Key Vault Certificate identifiers.
 */
export type KeyVaultCertificatesIdentifierCollectionName = "certificates" | "deletedcertificates";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultCertificatesIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultCertificatesIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Certificate unique identifier (a URL).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Certificate. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Certificate.
   */
  name: string;
}

/**
 * Parses a KeyVaultIdentifier from a string URI.
 */
export function parseKeyVaultCertificatesIdentifier(
  id: string
): ParsedKeyVaultCertificatesIdentifier {
  const urlParts = id.split("/");
  const collection: KeyVaultCertificatesIdentifierCollectionName = urlParts[3] as KeyVaultCertificatesIdentifierCollectionName;

  const collections: KeyVaultCertificatesIdentifierCollectionName[] = [
    "certificates",
    "deletedcertificates"
  ];

  if (!collections.includes(collection)) {
    throw new Error(`The only collections allowed are: ${collections.join(", ")}`);
  }

  return {
    collection,
    id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
