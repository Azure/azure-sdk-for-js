// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a DevOps Configuration.
 *
 * @summary gets a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetDevOpsConfigurationsWithAgentlessConfigurations_example.json
 */
async function getDevOpsConfigurationsWithAgentlessConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.get("myRg", "mySecurityConnectorName");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a DevOps Configuration.
 *
 * @summary gets a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetDevOpsConfigurationsWithCapabilities_example.json
 */
async function getDevOpsConfigurationsWithCapabilities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.get("myRg", "mySecurityConnectorName");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a DevOps Configuration.
 *
 * @summary gets a DevOps Configuration.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetDevOpsConfigurations_example.json
 */
async function getDevOpsConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsConfigurations.get("myRg", "mySecurityConnectorName");
  console.log(result);
}

async function main() {
  await getDevOpsConfigurationsWithAgentlessConfigurations();
  await getDevOpsConfigurationsWithCapabilities();
  await getDevOpsConfigurations();
}

main().catch(console.error);
