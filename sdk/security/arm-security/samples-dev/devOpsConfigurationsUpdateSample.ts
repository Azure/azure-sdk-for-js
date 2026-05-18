// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a DevOps Configuration.
 *
 * @summary updates a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/UpdateDevOpsConfigurations_example.json
 */
async function updateDevOpsConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.update("myRg", "mySecurityConnectorName", {
    properties: {
      agentlessConfiguration: {
        agentlessAutoDiscovery: "Disabled",
        agentlessEnabled: "Enabled",
        inventoryList: [{ inventoryKind: "AzureDevOpsOrganization", value: "org1" }],
        inventoryListType: "Inclusion",
        scanners: ["scanner1", "scanner2"],
      },
      autoDiscovery: "Enabled",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateDevOpsConfigurations();
}

main().catch(console.error);
