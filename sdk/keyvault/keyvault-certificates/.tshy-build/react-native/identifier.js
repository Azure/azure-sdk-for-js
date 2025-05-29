// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { parseKeyVaultIdentifier } from "@azure/keyvault-common";
/**
 * Parses the given Key Vault Certificate Id. An example is:
 *
 *   https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>
 *
 * On parsing the above Id, this function returns:
 *```ts snippet:ignore
 *   {
 *      sourceId: "https://<keyvault-name>.vault.azure.net/certificates/<certificate-name>/<unique-version-id>",
 *      vaultUrl: "https://<keyvault-name>.vault.azure.net",
 *      version: "<unique-version-id>",
 *      name: "<certificate-name>"
 *   }
 *```
 * @param id - The Id of the Key Vault Certificate.
 */
export function parseKeyVaultCertificateIdentifier(id) {
    const urlParts = id.split("/");
    const collection = urlParts[3];
    return Object.assign({ sourceId: id }, parseKeyVaultIdentifier(collection, id));
}
//# sourceMappingURL=identifier.js.map