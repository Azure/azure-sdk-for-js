// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Proxies a Functions host call to the function app backed by the container app.
 *
 * @summary Proxies a Functions host call to the function app backed by the container app.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/FunctionsExtension_Post.json
 */
async function invokeFunctionsHostUsingFunctionsExtensionApi(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testcontainerApp0";
  const revisionName = "testcontainerApp0-pjxhsye";
  const functionAppName = "testcontainerApp0";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.functionsExtension.invokeFunctionsHost(
    resourceGroupName,
    containerAppName,
    revisionName,
    functionAppName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await invokeFunctionsHostUsingFunctionsExtensionApi();
}

main().catch(console.error);
