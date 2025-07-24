// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get API key details of a kafka or schema registry cluster
 *
 * @summary get API key details of a kafka or schema registry cluster
 * x-ms-original-file: 2024-07-01/Organization_GetClusterAPIKey.json
 */
async function organizationGetClusterAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getClusterAPIKey(
    "myResourceGroup",
    "myOrganization",
    "apiKeyId-123",
  );
  console.log(result);
}

async function main() {
  await organizationGetClusterAPIKey();
}

main().catch(console.error);
