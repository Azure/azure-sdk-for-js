// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Reconcile NSP association
 *
 * @summary Reconcile NSP association
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspAssociationReconcile.json
 */
async function nspAssociationReconcile(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const associationName = "association1";
  const parameters: Record<string, unknown> = { properties: {} };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAssociations.reconcile(
    resourceGroupName,
    networkSecurityPerimeterName,
    associationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationReconcile();
}

main().catch(console.error);
