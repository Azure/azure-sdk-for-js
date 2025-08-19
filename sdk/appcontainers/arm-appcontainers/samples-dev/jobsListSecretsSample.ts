// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List secrets for a container apps job
 *
 * @summary List secrets for a container apps job
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Job_ListSecrets.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listContainerAppsJobSecrets(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const jobName = "testcontainerappsjob0";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.listSecrets(resourceGroupName, jobName);
  console.log(result);
}

async function main(): Promise<void> {
  await listContainerAppsJobSecrets();
}

main().catch(console.error);
