// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateTrafficManagerManagementClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Site.
 *
 * @summary deletes a Site.
 * x-ms-original-file: 2026-02-09-preview/Sites_Delete_MaximumSet_Gen.json
 */
async function sitesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  await client.sites.delete("rgprivateTrafficManager", "myTopologyMap", "mySite");
}

async function main(): Promise<void> {
  await sitesDeleteMaximumSet();
}

main().catch(console.error);
