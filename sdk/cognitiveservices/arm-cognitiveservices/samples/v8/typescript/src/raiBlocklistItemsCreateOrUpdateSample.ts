// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RaiBlocklistItem,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified blocklist item associated with the Azure OpenAI account.
 *
 * @summary Update the state of specified blocklist item associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutRaiBlocklistItem.json
 */
async function putRaiBlocklistItem(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "raiBlocklistName";
  const raiBlocklistItemName = "raiBlocklistItemName";
  const raiBlocklistItem: RaiBlocklistItem = {
    properties: { isRegex: false, pattern: "Pattern To Block" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiBlocklistItems.createOrUpdate(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklistItemName,
    raiBlocklistItem,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiBlocklistItem();
}

main().catch(console.error);
