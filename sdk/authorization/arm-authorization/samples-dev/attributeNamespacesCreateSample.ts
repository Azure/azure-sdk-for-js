// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new attribute namespace.
 *
 * @summary creates a new attribute namespace.
 * x-ms-original-file: 2025-12-01-preview/CreateAttributeNamespace.json
 */
async function createAttributeNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.attributeNamespaces.create("contoso", {
    namespaceOwnerPrincipalId: "a3bb8764-cb92-4276-9d2a-ca1e895e55ea",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAttributeNamespace();
}

main().catch(console.error);
