// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Deployment stack with the given name.
 *
 * @summary gets the Deployment stack with the given name.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupGet.json
 */
async function getAManagementGroupDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacksWhatIfResultsAtManagementGroup.get(
    "myMg",
    "simpleDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAManagementGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
