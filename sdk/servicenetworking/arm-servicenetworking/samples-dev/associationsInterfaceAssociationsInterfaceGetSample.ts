// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Association
 *
 * @summary get a Association
 * x-ms-original-file: 2025-01-01/AssociationGet.json
 */
async function getAssociation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.associationsInterface.AssociationsInterface_get("rg1", "tc1", "as1");
  console.log(result);
}

async function main(): Promise<void> {
  getAssociation();
}

main().catch(console.error);
