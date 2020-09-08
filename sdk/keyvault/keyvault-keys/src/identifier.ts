// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents the segments that compose a Key Vault Key Id.
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
   * The URL of the Azure Key Vault instance to which the Key belongs.
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
 * Parses the given Key Vault Key Id. An example is:
 *
 *   https://<keyvault-name>.vault.azure.net/keys/<key-name>/<unique-version-id>
 *
 * On parsing the above Id, this function returns:
 *
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/keys/<key-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<key-name>"
 *   }
 *
 * @param id The Id of the Key Vault Key.
 */
export function parseKeyVaultKeyId(id: string): KeyVaultKeyId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
