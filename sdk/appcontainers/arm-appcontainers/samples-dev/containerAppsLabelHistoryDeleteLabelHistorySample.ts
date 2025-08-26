// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete the history of a label.
 *
 * @summary Delete the history of a label.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/LabelHistory_Delete.json
 */
async function deleteContainerAppLabelHistoryForAGivenLabel(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testContainerApp";
  const labelName = "dev";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsLabelHistory.deleteLabelHistory(
    resourceGroupName,
    containerAppName,
    labelName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteContainerAppLabelHistoryForAGivenLabel();
}

main().catch(console.error);
