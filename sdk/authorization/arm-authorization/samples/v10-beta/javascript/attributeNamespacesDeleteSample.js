// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified attribute namespace.
 *
 * @summary deletes the specified attribute namespace.
 * x-ms-original-file: 2025-12-01-preview/DeleteAttributeNamespace.json
 */
async function deleteAttributeNamespace() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.attributeNamespaces.delete("contoso");
}

async function main() {
  await deleteAttributeNamespace();
}

main().catch(console.error);
