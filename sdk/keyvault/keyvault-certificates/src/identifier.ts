// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "../../keyvault-common/src";

/**
 * Represents the segments that compose a Key Vault Certificate Id.
 */
export interface KeyVaultCertificateIdentifier {
  /**
   * The complete representation of the Key Vault Certificate Id. For example:
   *
   *   https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>
   *
   */
  sourceId: string;

  /**
   * The URL of the Azure Key Vault instance to which the Certificate belongs.
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
 * Parses the given Key Vault Certificate Id. An example is:
 *
 *   https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>
 *
 * On parsing the above Id, this function returns:
 *```ts
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<certificate-name>"
 *   }
 *```
 * @param id - The Id of the Key Vault Certificate.
 */
export function parseKeyVaultCertificateIdentifier(id: string): KeyVaultCertificateIdentifier {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id),
  };
}
