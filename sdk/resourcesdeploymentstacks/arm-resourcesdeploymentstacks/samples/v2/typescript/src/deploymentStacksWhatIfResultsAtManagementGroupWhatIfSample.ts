// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns property-level changes that will be made by the deployment if executed.
 *
 * @summary returns property-level changes that will be made by the deployment if executed.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupWhatIf.json
 */
async function getADetailedManagementGroupDeploymentStackWhatIfResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacksWhatIfResultsAtManagementGroup.whatIf(
    "myMg",
    "changedDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADetailedManagementGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
