// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the token used to connect to the endpoint where source code can be uploaded for a build.
 *
 * @summary gets the token used to connect to the endpoint where source code can be uploaded for a build.
 * x-ms-original-file: 2025-10-02-preview/Builds_ListAuthToken.json
 */
async function getBuildAuthToken() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.buildAuthToken.list("rg", "testBuilder", "testBuild");
  console.log(result);
}

async function main() {
  await getBuildAuthToken();
}

main().catch(console.error);
