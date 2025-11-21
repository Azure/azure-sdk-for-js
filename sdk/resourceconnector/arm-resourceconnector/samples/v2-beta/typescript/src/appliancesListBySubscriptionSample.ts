// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance
 *
 * @summary gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance
 * x-ms-original-file: 2025-03-01-preview/AppliancesListBySubscription.json
 */
async function listAppliancesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appliances.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppliancesBySubscription();
}

main().catch(console.error);
