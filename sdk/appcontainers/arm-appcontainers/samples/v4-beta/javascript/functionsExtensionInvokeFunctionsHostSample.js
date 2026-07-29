// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to proxies a Functions host call to the function app backed by the container app.
 *
 * @summary proxies a Functions host call to the function app backed by the container app.
 * x-ms-original-file: 2025-10-02-preview/FunctionsExtension_Post.json
 */
async function invokeFunctionsHostUsingFunctionsExtensionAPI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.functionsExtension.invokeFunctionsHost(
    "rg",
    "testcontainerApp0",
    "testcontainerApp0-pjxhsye",
    "testcontainerApp0",
  );
  console.log(result);
}

async function main() {
  await invokeFunctionsHostUsingFunctionsExtensionAPI();
}

main().catch(console.error);
