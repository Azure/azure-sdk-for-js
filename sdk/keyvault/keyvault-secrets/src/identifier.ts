// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "../../keyvault-common/src";

/**
 * Represents the segments that compose a Key Vault Secret Id.
 */
export interface KeyVaultSecretIdentifier {
  /**
   * The complete representation of the Key Vault Secret Id. For example:
   *
   *   https://<keyvault-name>.vault.azure.net/secrets/<secret-name>/<unique-version-id>
   *
   */
  sourceId: string;

  /**
   * The URL of the Azure Key Vault instance to which the Secret belongs.
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
 * Parses the given Key Vault Secret Id. An example is:
 *
 *   https://<keyvault-name>.vault.azure.net/secrets/<secret-name>/<unique-version-id>
 *
 * On parsing the above Id, this function returns:
 *```ts
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/secrets/<secret-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<secret-name>"
 *   }
 *```
 * @param id - The Id of the Key Vault Secret.
 */
export function parseKeyVaultSecretIdentifier(id: string): KeyVaultSecretIdentifier {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
