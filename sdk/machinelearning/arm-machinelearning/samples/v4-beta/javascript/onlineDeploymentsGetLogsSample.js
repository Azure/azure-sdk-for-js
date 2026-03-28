// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to polls an Endpoint operation.
 *
 * @summary polls an Endpoint operation.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/getLogs.json
 */
async function getOnlineDeploymentLogs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.getLogs(
    "testrg123",
    "workspace123",
    "testEndpoint",
    "testDeployment",
    { containerType: "StorageInitializer", tail: 0 },
  );
  console.log(result);
}

async function main() {
  await getOnlineDeploymentLogs();
}

main().catch(console.error);
