// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of diagnostics for a Container App Job.
 *
 * @summary get the list of diagnostics for a Container App Job.
 * x-ms-original-file: 2025-10-02-preview/Job_ListDetectors.json
 */
async function getTheListOfAvailableDiagnosticDataForAContainerAppJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobs.listDetectors("mikono-workerapp-test-rg", "mikonojob1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheListOfAvailableDiagnosticDataForAContainerAppJob();
}

main().catch(console.error);
