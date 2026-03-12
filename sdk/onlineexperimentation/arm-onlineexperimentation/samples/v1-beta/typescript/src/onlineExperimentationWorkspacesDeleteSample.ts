// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an online experimentation workspace.
 *
 * @summary deletes an online experimentation workspace.
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_Delete.json
 */
async function deleteAnOnlineExperimentationWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  await client.onlineExperimentationWorkspaces.delete(
    "res9871",
    "expworkspace3",
  );
}

async function main(): Promise<void> {
  await deleteAnOnlineExperimentationWorkspace();
}

main().catch(console.error);
