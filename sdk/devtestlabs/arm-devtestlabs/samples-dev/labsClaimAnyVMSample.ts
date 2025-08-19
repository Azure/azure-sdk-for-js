// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Claim a random claimable virtual machine in the lab. This operation can take a while to complete.
 *
 * @summary Claim a random claimable virtual machine in the lab. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Labs_ClaimAnyVm.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function labsClaimAnyVM(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const name = "{labName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.labs.beginClaimAnyVmAndWait(resourceGroupName, name);
  console.log(result);
}

labsClaimAnyVM().catch(console.error);
