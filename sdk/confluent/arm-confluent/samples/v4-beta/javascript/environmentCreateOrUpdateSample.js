// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create confluent environment
 *
 * @summary create confluent environment
 * x-ms-original-file: 2024-07-01/Environment_Create.json
 */
async function environmentCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.environment.createOrUpdate(
    "myResourceGroup",
    "myOrganization",
    "env-1",
    {
      body: {
        properties: { streamGovernanceConfig: { package: "ESSENTIALS" } },
      },
    },
  );
  console.log(result);
}

async function main() {
  await environmentCreateOrUpdate();
}

main().catch(console.error);
