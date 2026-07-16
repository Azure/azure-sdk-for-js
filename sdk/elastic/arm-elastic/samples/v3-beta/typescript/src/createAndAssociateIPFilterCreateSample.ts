// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create and associate an IP filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary create and associate an IP filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: 2025-06-01/IPTrafficFilter_Create.json
 */
async function createAndAssociateIPFilterCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.createAndAssociateIPFilter.create("myResourceGroup", "myMonitor", {
    ips: "192.168.131.0, 192.168.132.6/22",
  });
}

async function main(): Promise<void> {
  await createAndAssociateIPFilterCreate();
}

main().catch(console.error);
