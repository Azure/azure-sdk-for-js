// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the workspace vNet Peerings.
 *
 * @summary lists the workspace vNet Peerings.
 * x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringList.json
 */
async function listAllVNetPeeringsForTheWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0140911e-1040-48da-8bc9-b99fb3dd88a6/";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vNetPeering.listByWorkspace("subramantest", "adbworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllVNetPeeringsForTheWorkspace();
}

main().catch(console.error);
