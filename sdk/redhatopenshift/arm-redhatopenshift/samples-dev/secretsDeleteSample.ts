// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation returns nothing.
 *
 * @summary The operation returns nothing.
 * x-ms-original-file: specification/redhatopenshift/resource-manager/Microsoft.RedHatOpenShift/openshiftclusters/stable/2023-11-22/examples/Secrets_Delete.json
 */

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletesASecretWithTheSpecifiedSubscriptionResourceGroupAndResourceName(): Promise<void> {
  const subscriptionId = process.env["REDHATOPENSHIFT_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["REDHATOPENSHIFT_RESOURCE_GROUP"] || "resourceGroup";
  const resourceName = "resourceName";
  const childResourceName = "childResourceName";
  const credential = new DefaultAzureCredential();
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.secrets.delete(resourceGroupName, resourceName, childResourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await deletesASecretWithTheSpecifiedSubscriptionResourceGroupAndResourceName();
}

main().catch(console.error);
