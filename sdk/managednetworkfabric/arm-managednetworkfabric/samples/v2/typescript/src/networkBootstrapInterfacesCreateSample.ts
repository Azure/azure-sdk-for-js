// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Network Bootstrap Interface resource.
 *
 * @summary create a Network Bootstrap Interface resource.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_Create.json
 */
async function networkBootstrapInterfacesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapInterfaces.create(
    "example-rg",
    "example-device",
    "example-interface",
    {
      annotation: "annotation",
      additionalDescription: "additionalDescription",
      serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkBootstrapInterfacesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
