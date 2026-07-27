// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 *
 * @summary fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/DeploymentInfo_List.json
 */
async function deploymentInfoList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.deploymentInfo.list("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await deploymentInfoList();
}

main().catch(console.error);
