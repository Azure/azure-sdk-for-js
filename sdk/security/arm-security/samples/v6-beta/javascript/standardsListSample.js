// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get security standards on all your resources inside a scope
 *
 * @summary get security standards on all your resources inside a scope
 * x-ms-original-file: 2021-08-01-preview/Standards/ListStandards_example.json
 */
async function listSecurityStandards() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.standards.list("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityStandards();
}

main().catch(console.error);
