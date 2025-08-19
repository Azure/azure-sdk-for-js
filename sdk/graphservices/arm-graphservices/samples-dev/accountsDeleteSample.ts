// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GraphServices } from "@azure/arm-graphservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a account resource.
 *
 * @summary Deletes a account resource.
 * x-ms-original-file: specification/graphservicesprod/resource-manager/Microsoft.GraphServices/stable/2023-04-13/examples/Accounts_Delete.json
 */
async function deleteAccountResource(): Promise<void> {
  const subscriptionId =
    process.env["GRAPHSERVICES_SUBSCRIPTION_ID"] || "11111111-aaaa-1111-bbbb-111111111111";
  const resourceGroupName = process.env["GRAPHSERVICES_RESOURCE_GROUP"] || "testResourceGroupGRAM";
  const resourceName = "11111111-aaaa-1111-bbbb-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new GraphServices(credential, subscriptionId);
  const result = await client.accounts.delete(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAccountResource();
}

main().catch(console.error);
