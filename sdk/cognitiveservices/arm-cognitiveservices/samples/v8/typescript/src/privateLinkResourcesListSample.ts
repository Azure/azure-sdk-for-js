// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a Cognitive Services account.
 *
 * @summary Gets the private link resources that need to be created for a Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListPrivateLinkResources.json
 */
async function listPrivateLinkResources(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.privateLinkResources.list(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateLinkResources();
}

main().catch(console.error);
