// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an environment type.
 *
 * @summary deletes an environment type.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentTypes_Delete.json
 */
async function environmentTypesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.environmentTypes.delete("rg1", "Contoso", "DevTest");
}

async function main() {
  await environmentTypesDelete();
}

main().catch(console.error);
