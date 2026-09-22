// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all access points in a network gateway
 *
 * @summary lists all access points in a network gateway
 * x-ms-original-file: 2026-06-02-preview/AccessPointResources_List_MaximumSet_Gen.json
 */
async function accessPointResourcesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessPointResources.list(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await accessPointResourcesListMaximumSet();
}

main().catch(console.error);
