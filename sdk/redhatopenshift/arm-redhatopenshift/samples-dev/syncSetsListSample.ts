// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation returns properties of each SyncSet.
 *
 * @summary The operation returns properties of each SyncSet.
 * x-ms-original-file: specification/redhatopenshift/resource-manager/Microsoft.RedHatOpenShift/openshiftclusters/stable/2023-11-22/examples/SyncSets_List.json
 */

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsSyncSetsThatBelongToThatAzureRedHatOpenShiftCluster(): Promise<void> {
  const subscriptionId = process.env["REDHATOPENSHIFT_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["REDHATOPENSHIFT_RESOURCE_GROUP"] || "resourceGroup";
  const resourceName = "resourceName";
  const credential = new DefaultAzureCredential();
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.syncSets.list(resourceGroupName, resourceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsSyncSetsThatBelongToThatAzureRedHatOpenShiftCluster();
}

main().catch(console.error);
