// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns property-level changes that will be made by the deployment if executed.
 *
 * @summary returns property-level changes that will be made by the deployment if executed.
 * x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionWhatIf.json
 */
async function getADetailedSubscriptionDeploymentStackWhatIfResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result = await client.deploymentStacksWhatIfResultsAtSubscription.whatIf(
    "changedDeploymentStackWhatIfResult",
  );
  console.log(result);
}

async function main() {
  await getADetailedSubscriptionDeploymentStackWhatIfResult();
}

main().catch(console.error);
