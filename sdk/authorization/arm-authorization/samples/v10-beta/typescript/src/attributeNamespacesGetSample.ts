// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified attribute namespace.
 *
 * @summary gets the specified attribute namespace.
 * x-ms-original-file: 2025-12-01-preview/GetAttributeNamespace.json
 */
async function getAttributeNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.attributeNamespaces.get("contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await getAttributeNamespace();
}

main().catch(console.error);
