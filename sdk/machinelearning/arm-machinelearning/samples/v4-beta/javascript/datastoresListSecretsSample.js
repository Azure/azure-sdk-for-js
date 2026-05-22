// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get datastore secrets.
 *
 * @summary get datastore secrets.
 * x-ms-original-file: 2025-12-01/Datastore/listSecrets.json
 */
async function getDatastoreSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.datastores.listSecrets("test-rg", "my-aml-workspace", "string", {
    body: { expirableSecret: false, expireAfterHours: 1 },
  });
  console.log(result);
}

async function main() {
  await getDatastoreSecrets();
}

main().catch(console.error);
