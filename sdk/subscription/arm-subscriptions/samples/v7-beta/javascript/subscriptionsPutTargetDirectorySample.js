// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to initiate Subscription Changed Request
 *
 * @summary the operation to initiate Subscription Changed Request
 * x-ms-original-file: 2025-11-01-preview/putTargetDirectory.json
 */
async function putTargetDirectory() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.putTargetDirectory(
    "ecce7b25-862b-44a2-9e21-a1baa50618eb",
    {
      properties: {
        destinationOwnerId: "abhaypratap@live.com",
        destinationTenantId: "111a82eb-4c7b-48bb-962b-49363c510130",
      },
    },
  );
  console.log(result);
}

async function main() {
  await putTargetDirectory();
}

main().catch(console.error);
