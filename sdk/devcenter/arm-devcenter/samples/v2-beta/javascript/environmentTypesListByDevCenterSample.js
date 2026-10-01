// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists environment types for the devcenter.
 *
 * @summary lists environment types for the devcenter.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentTypes_List.json
 */
async function environmentTypesListByDevCenter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.environmentTypes.listByDevCenter("rg1", "Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await environmentTypesListByDevCenter();
}

main().catch(console.error);
