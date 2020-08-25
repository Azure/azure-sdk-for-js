// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault Secret Id and its parsed contents.
 */
export interface ParsedKeyVaultSecretId {
  /**
   * The originally received Id.
   */
  sourceId: string;

  /**
   * The Key Vault Secret unique Id (an URl).
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
 * Parses the string Id from a Key Vault Secret into the ParsedKeyVaultSecretId type.
 */
export function parseKeyVaultSecretId(id: string): ParsedKeyVaultSecretId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
