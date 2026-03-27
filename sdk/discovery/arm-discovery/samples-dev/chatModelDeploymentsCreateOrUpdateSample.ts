// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ChatModelDeployment
 *
 * @summary create a ChatModelDeployment
 * x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function chatModelDeploymentsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.createOrUpdate(
    "rgdiscovery",
    "eb2204766409e111d9",
    "d1844ae17cc93bd299",
    {
      properties: { modelFormat: "tcttsgevrsuflt", modelName: "nvwdoluhukiachlyrdnpxusxsc" },
      tags: { key4822: "fpesmhjievwzxmhxszcgpztivcgw" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await chatModelDeploymentsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
