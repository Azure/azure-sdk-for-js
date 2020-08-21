// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultCertificatesIdentifier {
  /**
   * The originally received identifier.
   */
  sourceId: string;

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
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
