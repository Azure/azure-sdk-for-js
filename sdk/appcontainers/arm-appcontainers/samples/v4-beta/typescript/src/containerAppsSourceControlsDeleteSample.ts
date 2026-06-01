// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Container App SourceControl.
 *
 * @summary delete a Container App SourceControl.
 * x-ms-original-file: 2025-10-02-preview/SourceControls_Delete.json
 */
async function deleteContainerAppSourceControl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerAppsSourceControls.delete(
    "workerapps-rg-xj",
    "testcanadacentral",
    "current",
    {
      xMsGithubAuxiliary: "githubaccesstoken",
      ignoreWorkflowDeletionFailure: false,
      deleteWorkflow: false,
    },
  );
}

async function main(): Promise<void> {
  await deleteContainerAppSourceControl();
}

main().catch(console.error);
