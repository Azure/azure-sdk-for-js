// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents the segments that compose a Key Vault Key Id.
 * Key Vault Key Ids are Uniform Resource Identifiers (URIs).
 */
export interface KeyVaultKeyId {
  /**
   * The complete representation of the Key Vault Key Id. For example:
   *
   *   https://<keyvault-name>.vault.azure.net/keys/<key-name>/<unique-version-id>
   *
   */
  sourceId: string;

  /**
   * The URL of the Azure Key Vault. Part of the Key Id.
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
