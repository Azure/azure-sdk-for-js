// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Only rollouts in terminal state can be deleted.
 *
 * @summary Only rollouts in terminal state can be deleted.
 * x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_delete.json
 */

import { AzureDeploymentManager } from "@azure/arm-deploymentmanager";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteRollout(): Promise<void> {
  const subscriptionId = "caac1590-e859-444f-a9e0-62091c0f5929";
  const resourceGroupName = "myResourceGroup";
  const rolloutName = "myRollout";
  const credential = new DefaultAzureCredential();
  const client = new AzureDeploymentManager(credential, subscriptionId);
  const result = await client.rollouts.delete(resourceGroupName, rolloutName);
  console.log(result);
}

deleteRollout().catch(console.error);
