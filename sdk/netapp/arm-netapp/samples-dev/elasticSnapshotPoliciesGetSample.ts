// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ElasticSnapshotPolicy
 *
 * @summary get a ElasticSnapshotPolicy
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshotPolicies_Get.json
 */
async function elasticSnapshotPoliciesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticSnapshotPolicies.get("myRG", "account1", "snapshotPolicyName");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSnapshotPoliciesGet();
}

main().catch(console.error);
