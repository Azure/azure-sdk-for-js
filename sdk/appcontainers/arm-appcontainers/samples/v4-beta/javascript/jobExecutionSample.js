// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details of a single job execution
 *
 * @summary get details of a single job execution
 * x-ms-original-file: 2025-10-02-preview/Job_Execution_Get.json
 */
async function getASingleJobExecution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobExecution("rg", "testcontainerAppsJob0", "jobExecution1");
  console.log(result);
}

async function main() {
  await getASingleJobExecution();
}

main().catch(console.error);
