// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @summary deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionDelete.json
 */
async function deleteASubscriptionDeploymentStackWhatIfResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  await client.deploymentStacksWhatIfResultsAtSubscription.delete("simpleDeploymentStack");
}

async function main() {
  await deleteASubscriptionDeploymentStackWhatIfResult();
}

main().catch(console.error);
