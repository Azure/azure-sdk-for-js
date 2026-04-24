// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @summary deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupDelete.json
 */
async function deleteAManagementGroupDeploymentStackWhatIfResult() {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  await client.deploymentStacksWhatIfResultsAtManagementGroup.delete(
    "myMg",
    "simpleDeploymentStack",
  );
}

async function main() {
  await deleteAManagementGroupDeploymentStackWhatIfResult();
}

main().catch(console.error);
