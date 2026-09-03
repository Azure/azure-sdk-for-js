// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified Managed Http Route Config.
 *
 * @summary get the specified Managed Http Route Config.
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_Get.json
 */
async function getHttpRoute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfig.get(
    "examplerg",
    "testcontainerenv",
    "httproutefriendlyname",
  );
  console.log(result);
}

async function main() {
  await getHttpRoute();
}

main().catch(console.error);
