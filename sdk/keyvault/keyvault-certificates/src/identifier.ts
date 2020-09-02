// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents the segments that compose a Key Vault Certificate Id.
 * Key Vault Certificate Ids are Uniform Resource Identifiers (URIs).
 */
export interface KeyVaultCertificateId {
  /**
   * The complete representation of the Key Vault Certificate Id. An example could be:
   *
   *   https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>
   *
   */
  sourceId: string;

  /**
   * The URL of the Azure Key Vault. Part of the Certificate Id.
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
 * Parses the given Key Vault Certificate Id.
 * Key Vault Ids come in the shape of URIs, for example
 * a KeyVaultCertificate will have an `id` property, with a value similar to the following one:
 *
 *   https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>
 *
 * This URI can be parsed into segments using this function. The previous example would result in:
 *
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<certificate-name>"
 *   }
 *
 * @param {string} id The Id of the Key Vault Certificate.
 */
export function parseKeyVaultCertificateId(id: string): KeyVaultCertificateId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
