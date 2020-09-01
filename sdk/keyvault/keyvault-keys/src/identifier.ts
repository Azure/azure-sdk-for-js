// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents different components of a Key Vault Key Id.
 */
export interface KeyVaultKeyId {
  /**
   * The source ID that was parsed.
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
 * Parses the given Key Vault Key Id.
 * Key Vault Ids come in the shape of URIs, for example
 * a KeyVaultKey will have an `id` property, with a value similar to the following one:
 *
 *   https://<keyvault-name>.vault.azure.net/keys/<key-name>/<unique-version-id>
 *
 * This URI can be parsed into segments using this function. The previous example would result in:
 *
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/keys/<key-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<key-name>"
 *   }
 *
 * @param {string} id The Id of the Key Vault Key.
 */
export function parseKeyVaultKeyId(id: string): KeyVaultKeyId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
