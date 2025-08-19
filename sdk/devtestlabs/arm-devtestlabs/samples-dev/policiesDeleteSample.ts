// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Delete policy.
 *
 * @summary Delete policy.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Policies_Delete.json
 */
async function policiesDelete(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const policySetName = "{policySetName}";
  const name = "{policyName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.policies.delete(resourceGroupName, labName, policySetName, name);
  console.log(result);
}

policiesDelete().catch(console.error);
