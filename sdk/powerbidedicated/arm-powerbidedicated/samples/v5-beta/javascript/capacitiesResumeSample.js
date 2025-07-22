// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resumes operation of the specified Dedicated capacity instance.
 *
 * @summary resumes operation of the specified Dedicated capacity instance.
 * x-ms-original-file: 2021-01-01/resumeCapacity.json
 */
async function getDetailsOfACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.resume("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  await getDetailsOfACapacity();
}

main().catch(console.error);
