// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the state of specified blocklist associated with the Azure OpenAI account.
 *
 * @summary Update the state of specified blocklist associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutRaiBlocklist.json
 */

import {
  RaiBlocklist,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putRaiBlocklist(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "raiBlocklistName";
  const raiBlocklist: RaiBlocklist = {
    properties: { description: "Basic blocklist description" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiBlocklists.createOrUpdate(
    resourceGroupName,
    accountName,
    raiBlocklistName,
    raiBlocklist,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiBlocklist();
}

main().catch(console.error);
