// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the revision history associated with a Container App label.
 *
 * @summary deletes the revision history associated with a Container App label.
 * x-ms-original-file: 2026-07-01/LabelHistory_Delete.json
 */
async function deleteContainerAppLabelHistoryForAGivenLabel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsLabelHistory.deleteLabelHistory("rg", "testContainerApp", "dev");
}

async function main() {
  await deleteContainerAppLabelHistoryForAGivenLabel();
}

main().catch(console.error);
