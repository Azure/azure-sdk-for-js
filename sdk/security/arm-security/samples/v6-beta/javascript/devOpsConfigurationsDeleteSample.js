// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DevOps Connector.
 *
 * @summary deletes a DevOps Connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/DeleteDevOpsConfigurations_example.json
 */
async function deleteDevOpsConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.devOpsConfigurations.delete("myRg", "mySecurityConnectorName");
}

async function main() {
  await deleteDevOpsConfigurations();
}

main().catch(console.error);
