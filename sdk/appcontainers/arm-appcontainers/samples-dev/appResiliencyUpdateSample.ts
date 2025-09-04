// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AppResiliency,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update container app resiliency policy.
 *
 * @summary Update container app resiliency policy.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/AppResiliency_Patch.json
 */
async function updateAppResiliency(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const appName = "testcontainerApp0";
  const name = "resiliency-policy-1";
  const resiliencyEnvelope: AppResiliency = {
    timeoutPolicy: {
      connectionTimeoutInSeconds: 40,
      responseTimeoutInSeconds: 30,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.appResiliencyOperations.update(
    resourceGroupName,
    appName,
    name,
    resiliencyEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAppResiliency();
}

main().catch(console.error);
