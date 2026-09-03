// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EdgeActionVersion resources by EdgeAction
 *
 * @summary list EdgeActionVersion resources by EdgeAction
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_ListByEdgeAction.json
 */
async function getEdgeActionVersionsByEdgeAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeActionVersions.listByEdgeAction("testrg", "edgeAction1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEdgeActionVersionsByEdgeAction();
}

main().catch(console.error);
