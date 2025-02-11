// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Association
 *
 * @summary delete a Association
 * x-ms-original-file: 2025-01-01/AssociationDelete.json
 */
async function deleteAssociation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.associationsInterface.delete("rg1", "tc1", "as1");
}

async function main(): Promise<void> {
  await deleteAssociation();
}

main().catch(console.error);
