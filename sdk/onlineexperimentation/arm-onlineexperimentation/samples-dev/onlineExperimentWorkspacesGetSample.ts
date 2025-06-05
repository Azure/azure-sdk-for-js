// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an experiment workspace
 *
 * @summary gets an experiment workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Get.json
 */
async function getASingleOnlineExperimentWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentWorkspaces.get("res9871", "expworkspace3");
  console.log(result);
}

async function main(): Promise<void> {
  await getASingleOnlineExperimentWorkspace();
}

main().catch(console.error);
