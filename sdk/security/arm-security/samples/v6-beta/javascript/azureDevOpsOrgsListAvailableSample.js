// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of all Azure DevOps organizations accessible by the user token consumed by the connector.
 *
 * @summary returns a list of all Azure DevOps organizations accessible by the user token consumed by the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListAvailableAzureDevOpsOrgs_example.json
 */
async function listAvailableAzureDevOpsOrgs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.azureDevOpsOrgs.listAvailable("myRg", "mySecurityConnectorName");
  console.log(result);
}

async function main() {
  await listAvailableAzureDevOpsOrgs();
}

main().catch(console.error);
