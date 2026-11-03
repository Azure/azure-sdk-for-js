// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create an ASR network mapping.
 *
 * @summary the operation to create an ASR network mapping.
 * x-ms-original-file: 2025-08-01/ReplicationNetworkMappings_Create.json
 */
async function createsNetworkMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationNetworkMappings.create(
    "srcBvte2a14C27",
    "srce2avaultbvtaC27",
    "b0cef6e9a4437b81803d0b55ada4f700ab66caae59c35d62723a1589c0cd13ac",
    "e2267b5c-2650-49bd-ab3f-d66aae694c06",
    "corpe2amap",
    {
      properties: {
        fabricSpecificDetails: { instanceType: "VmmToAzure" },
        recoveryFabricName: "Microsoft Azure",
        recoveryNetworkId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/siterecoveryProd1/providers/Microsoft.Network/virtualNetworks/vnetavrai",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsNetworkMapping();
}

main().catch(console.error);
