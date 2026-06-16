// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to recommended tasks that will help improve the security of the subscription proactively
 *
 * @summary recommended tasks that will help improve the security of the subscription proactively
 * x-ms-original-file: 2015-06-01-preview/Tasks/GetTasksSubscription_example.json
 */
async function getSecurityRecommendationsTasks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tasks.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSecurityRecommendationsTasks();
}

main().catch(console.error);
