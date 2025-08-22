// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete backup policy
 *
 * @summary Delete backup policy
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/BackupPolicies_Delete.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function backupPoliciesDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NETAPP_RESOURCE_GROUP"] || "resourceGroup";
  const accountName = "accountName";
  const backupPolicyName = "backupPolicyName";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backupPolicies.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    backupPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await backupPoliciesDelete();
}

main().catch(console.error);
