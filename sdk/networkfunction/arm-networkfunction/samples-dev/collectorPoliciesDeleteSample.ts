// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a specified Collector Policy resource.
 *
 * @summary Deletes a specified Collector Policy resource.
 * x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/CollectorPolicyDelete.json
 */

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteCollectionPolicy(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const azureTrafficCollectorName = "atc";
  const collectorPolicyName = "cp1";
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const result = await client.collectorPolicies.beginDeleteAndWait(
    resourceGroupName,
    azureTrafficCollectorName,
    collectorPolicyName,
  );
  console.log(result);
}

deleteCollectionPolicy().catch(console.error);
