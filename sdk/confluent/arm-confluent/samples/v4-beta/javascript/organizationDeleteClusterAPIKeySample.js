// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes API key of a kafka or schema registry cluster
 *
 * @summary deletes API key of a kafka or schema registry cluster
 * x-ms-original-file: 2024-07-01/Organization_DeleteClusterAPIKey.json
 */
async function organizationDeleteClusterAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.deleteClusterAPIKey(
    "myResourceGroup",
    "myOrganization",
    "ZFZ6SZZZWGYBEIFB",
  );
}

async function main() {
  await organizationDeleteClusterAPIKey();
}

main().catch(console.error);
