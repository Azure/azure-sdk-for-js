// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets all online experimentation workspaces in a resource group.
 *
 * @summary gets all online experimentation workspaces in a resource group.
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_ListByResourceGroup.json
 */

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

async function listOnlineExperimentationWorkspacesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineExperimentationWorkspaces.listByResourceGroup("res9871")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOnlineExperimentationWorkspacesInAResourceGroup();
}

main().catch(console.error);
