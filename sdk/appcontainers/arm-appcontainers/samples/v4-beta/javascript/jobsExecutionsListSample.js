// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Container Apps Job's executions
 *
 * @summary get a Container Apps Job's executions
 * x-ms-original-file: 2025-10-02-preview/Job_Executions_Get.json
 */
async function getAContainerAppsJobExecutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobsExecutions.list("rg", "testcontainerAppsJob0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAContainerAppsJobExecutions();
}

main().catch(console.error);
