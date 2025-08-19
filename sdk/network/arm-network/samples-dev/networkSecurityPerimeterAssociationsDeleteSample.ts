// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an NSP association resource.
 *
 * @summary Deletes an NSP association resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NspAssociationDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nspAssociationDelete(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const associationName = "association1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkSecurityPerimeterAssociations.beginDeleteAndWait(
      resourceGroupName,
      networkSecurityPerimeterName,
      associationName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationDelete();
}

main().catch(console.error);
