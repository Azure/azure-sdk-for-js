// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 *
 * @summary fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/DeploymentInfo_List.json
 */
async function deploymentInfoList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.deploymentInfo.list("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await deploymentInfoList();
}

main().catch(console.error);
