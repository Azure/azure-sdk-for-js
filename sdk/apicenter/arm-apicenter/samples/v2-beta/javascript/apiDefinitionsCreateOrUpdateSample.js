// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new or updates existing API definition.
 *
 * @summary creates new or updates existing API definition.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_CreateOrUpdate.json
 */
async function apiDefinitionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiDefinitions.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "openapi",
    "2023-01-01",
    "openapi",
    { properties: { title: "OpenAPI", description: "Default spec" } },
  );
  console.log(result);
}

async function main() {
  await apiDefinitionsCreateOrUpdate();
}

main().catch(console.error);
