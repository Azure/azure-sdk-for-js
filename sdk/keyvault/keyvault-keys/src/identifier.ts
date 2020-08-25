// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault Key Id and its parsed contents.
 */
export interface ParsedKeyVaultKeyId {
  /**
   * The originally received Id.
   */
  sourceId: string;

  /**
   * The Key Vault Key unique Id (an URl).
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
 * Parses the string Id from a Key Vault Key into the ParsedKeyVaultKeyId type.
 */
export function parseKeyVaultKeyId(id: string): ParsedKeyVaultKeyId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
