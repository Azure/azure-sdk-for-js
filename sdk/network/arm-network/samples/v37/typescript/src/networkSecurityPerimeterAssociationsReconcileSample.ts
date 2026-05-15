// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile NSP association
 *
 * @summary reconcile NSP association
 * x-ms-original-file: 2025-05-01/NspAssociationReconcile.json
 */
async function nspAssociationReconcile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAssociations.reconcile(
    "rg1",
    "nsp1",
    "association1",
    { properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationReconcile();
}

main().catch(console.error);
