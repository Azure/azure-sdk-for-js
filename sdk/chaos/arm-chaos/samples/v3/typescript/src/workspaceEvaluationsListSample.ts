// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists retained GA template evaluations under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend retention or convert scenario-backed legacy evaluations.
 *
 * @summary lists retained GA template evaluations under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend retention or convert scenario-backed legacy evaluations.
 * x-ms-original-file: 2026-11-01/WorkspaceEvaluations_List.json
 */
async function listRetainedWorkspaceEvaluationsUsingCanonicalIDsAndAnOpaqueNextLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceEvaluations.list("exampleRG", "exampleWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRetainedWorkspaceEvaluationsUsingCanonicalIDsAndAnOpaqueNextLink();
}

main().catch(console.error);
