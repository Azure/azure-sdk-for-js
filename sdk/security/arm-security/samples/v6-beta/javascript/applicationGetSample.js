// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific application for the requested scope by applicationId
 *
 * @summary get a specific application for the requested scope by applicationId
 * x-ms-original-file: 2022-07-01-preview/Applications/GetApplication_example.json
 */
async function getSecurityApplicationBySpecificApplicationId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.application.get("ad9a8e26-29d9-4829-bb30-e597a58cdbb8");
  console.log(result);
}

async function main() {
  await getSecurityApplicationBySpecificApplicationId();
}

main().catch(console.error);
