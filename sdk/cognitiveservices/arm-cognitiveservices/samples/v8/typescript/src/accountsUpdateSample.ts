// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Account,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Cognitive Services account
 *
 * @summary Updates a Cognitive Services account
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/UpdateAccount.json
 */
async function updateAccount(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "bvttest";
  const accountName = "bingSearch";
  const account: Account = { location: "global", sku: { name: "S2" } };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.accounts.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    account,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccount();
}

main().catch(console.error);
