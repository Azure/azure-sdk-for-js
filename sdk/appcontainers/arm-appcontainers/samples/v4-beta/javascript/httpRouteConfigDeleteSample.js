// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Managed Http Route.
 *
 * @summary deletes the specified Managed Http Route.
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_Delete.json
 */
async function deleteCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.httpRouteConfig.delete("examplerg", "testcontainerenv", "httproutefriendlyname");
}

async function main() {
  await deleteCertificate();
}

main().catch(console.error);
