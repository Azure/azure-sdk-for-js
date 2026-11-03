// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @summary deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupDelete.json
 */
async function deleteAResourceGroupDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  await client.deploymentStacksWhatIfResultsAtResourceGroup.delete(
    "myResourceGroup",
    "simpleDeploymentStack",
  );
}

async function main(): Promise<void> {
  await deleteAResourceGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
