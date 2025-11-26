// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 *
 * @summary Fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/DeploymentInfo_List.json
 */
async function deploymentInfoList() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.deploymentInfo.list(resourceGroupName, monitorName);
  console.log(result);
}

async function main() {
  await deploymentInfoList();
}

main().catch(console.error);
