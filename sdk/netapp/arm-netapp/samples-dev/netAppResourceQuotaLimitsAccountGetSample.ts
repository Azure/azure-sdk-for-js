// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the default, current and usages account quota limit
 *
 * @summary Get the default, current and usages account quota limit
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/preview/2025-01-01-preview/examples/QuotaLimitsAccount_Get.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumesRestoreStatus(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "myAccount";
  const quotaLimitName = "poolsPerAccount";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceQuotaLimitsAccount.get(
    resourceGroupName,
    accountName,
    quotaLimitName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesRestoreStatus();
}

main().catch(console.error);
