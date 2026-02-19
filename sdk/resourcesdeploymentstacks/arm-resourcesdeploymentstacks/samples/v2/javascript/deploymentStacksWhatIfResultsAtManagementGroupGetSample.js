// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Deployment stack with the given name.
 *
 * @summary gets the Deployment stack with the given name.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupGet.json
 */
async function getAManagementGroupDeploymentStackWhatIfResult() {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result = await client.deploymentStacksWhatIfResultsAtManagementGroup.get(
    "myMg",
    "simpleDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main() {
  await getAManagementGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
