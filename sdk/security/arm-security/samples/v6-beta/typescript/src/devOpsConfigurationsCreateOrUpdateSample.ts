// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DevOps Configuration.
 *
 * @summary creates or updates a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    { properties: { authorization: { code: "00000000000000000000" }, autoDiscovery: "Enabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a DevOps Configuration.
 *
 * @summary creates or updates a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardCurrentOnly_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardCurrentOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    { properties: { authorization: { code: "00000000000000000000" }, autoDiscovery: "Disabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a DevOps Configuration.
 *
 * @summary creates or updates a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsOnboardSelected_example.json
 */
async function createOrUpdateDevOpsConfigurationsOnboardSelected(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    {
      properties: {
        authorization: { code: "00000000000000000000" },
        autoDiscovery: "Disabled",
        topLevelInventoryList: ["org1", "org2"],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a DevOps Configuration.
 *
 * @summary creates or updates a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateDevOpsConfigurationsWithAgentlessConfigurations_example.json
 */
async function createOrUpdateDevOpsConfigurationsWithAgentlessConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    {
      properties: {
        agentlessConfiguration: {
          agentlessAutoDiscovery: "Disabled",
          agentlessEnabled: "Enabled",
          inventoryList: [{ inventoryKind: "AzureDevOpsOrganization", value: "org1" }],
          inventoryListType: "Inclusion",
          scanners: ["scanner1", "scanner2"],
        },
        authorization: { code: "00000000000000000000" },
        autoDiscovery: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDevOpsConfigurationsOnboardCurrentAndFuture();
  await createOrUpdateDevOpsConfigurationsOnboardCurrentOnly();
  await createOrUpdateDevOpsConfigurationsOnboardSelected();
  await createOrUpdateDevOpsConfigurationsWithAgentlessConfigurations();
}

main().catch(console.error);
