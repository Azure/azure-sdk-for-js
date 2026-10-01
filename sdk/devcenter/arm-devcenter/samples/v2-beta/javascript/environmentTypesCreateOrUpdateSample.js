// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an environment type.
 *
 * @summary creates or updates an environment type.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentTypes_Put.json
 */
async function environmentTypesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.environmentTypes.createOrUpdate("rg1", "Contoso", "DevTest", {
    displayName: "Dev",
    tags: { Owner: "superuser" },
  });
  console.log(result);
}

async function main() {
  await environmentTypesCreateOrUpdate();
}

main().catch(console.error);
