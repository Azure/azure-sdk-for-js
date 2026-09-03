// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a client.
 *
 * @summary get properties of a client.
 * x-ms-original-file: 2025-07-15-preview/Clients_Get.json
 */
async function clientsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.clients.get(
    "examplerg",
    "exampleNamespaceName1",
    "exampleClientName1",
  );
  console.log(result);
}

async function main() {
  await clientsGet();
}

main().catch(console.error);
