// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get usages for the requested Cognitive Services account
 *
 * @summary Get usages for the requested Cognitive Services account
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetUsages.json
 */
async function getUsages(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "5a4f5c2e-6983-4ccb-bd34-2196d5b5bbd3";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "TestUsage02";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.accounts.listUsages(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getUsages();
}

main().catch(console.error);
