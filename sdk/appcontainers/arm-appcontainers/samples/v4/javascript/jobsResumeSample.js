// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resumes execution for a suspended Container Apps job.
 *
 * @summary resumes execution for a suspended Container Apps job.
 * x-ms-original-file: 2026-07-01/Jobs_Resume.json
 */
async function resumeJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.resume("rg", "testcontainerAppsJob0");
  console.log(result);
}

async function main() {
  await resumeJob();
}

main().catch(console.error);
