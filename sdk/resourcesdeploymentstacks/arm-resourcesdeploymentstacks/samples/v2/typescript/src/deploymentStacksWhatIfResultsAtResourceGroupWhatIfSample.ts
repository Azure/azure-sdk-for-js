// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns property-level changes that will be made by the deployment if executed.
 *
 * @summary returns property-level changes that will be made by the deployment if executed.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupWhatIf.json
 */
async function getADetailedResourceGroupDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacksWhatIfResultsAtResourceGroup.whatIf(
    "myResourceGroup",
    "changedDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADetailedResourceGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
