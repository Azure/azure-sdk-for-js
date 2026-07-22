// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an alert configuration.
 *
 * @summary deletes an alert configuration.
 * x-ms-original-file: 2026-05-02-preview/AlertConfigurations_Delete.json
 */
async function deleteAlertConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.alertConfigurations.delete("rg1", "clustername1", "alertconfig1");
}

async function main() {
  await deleteAlertConfiguration();
}

main().catch(console.error);
