// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to recommended tasks that will help improve the security of the subscription proactively
 *
 * @summary recommended tasks that will help improve the security of the subscription proactively
 * x-ms-original-file: 2015-06-01-preview/Tasks/GetTaskResourceGroupLocation_example.json
 */
async function getSecurityRecommendationTaskInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.tasks.getResourceGroupLevelTask(
    "myRg",
    "westeurope",
    "d55b4dc0-779c-c66c-33e5-d7bce24c4222",
  );
  console.log(result);
}

async function main() {
  await getSecurityRecommendationTaskInAResourceGroup();
}

main().catch(console.error);
