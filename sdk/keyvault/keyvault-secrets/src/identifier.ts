// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents different components of a Key Vault Secret Id.
 */
export interface KeyVaultSecretId {
  /**
   * The source ID that was parsed.
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
 * Parses the given Key Vault Secret Id.
 * Key Vault Ids come in the shape of URIs, for example
 * a KeyVaultSecret will have an `id` property, with a value similar to the following one:
 *
 *   https://<keyvault-name>.vault.azure.net/secrets/<secret-name>/<unique-version-id>
 *
 * This URI can be parsed into segments using this function. The previous example would result in:
 *
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/secrets/<secret-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<secret-name>"
 *   }
 *
 * @param {string} id The Id of the Key Vault Secret.
 */
export function parseKeyVaultSecretId(id: string): KeyVaultSecretId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
