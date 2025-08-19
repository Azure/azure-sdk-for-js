// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation returns properties of each OpenShift cluster.
 *
 * @summary The operation returns properties of each OpenShift cluster.
 * x-ms-original-file: specification/redhatopenshift/resource-manager/Microsoft.RedHatOpenShift/openshiftclusters/stable/2023-11-22/examples/OpenShiftClusters_List.json
 */

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsOpenShiftClustersInTheSpecifiedSubscription(): Promise<void> {
  const subscriptionId = process.env["REDHATOPENSHIFT_SUBSCRIPTION_ID"] || "subscriptionId";
  const credential = new DefaultAzureCredential();
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.openShiftClusters.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsOpenShiftClustersInTheSpecifiedSubscription();
}

main().catch(console.error);
