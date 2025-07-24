// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Organization resource
 *
 * @summary update Organization resource
 * x-ms-original-file: 2024-07-01/Organization_Update.json
 */
async function confluentUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.update("myResourceGroup", "myOrganization", {
    body: { tags: { client: "dev-client", env: "dev" } },
  });
  console.log(result);
}

async function main() {
  await confluentUpdate();
}

main().catch(console.error);
