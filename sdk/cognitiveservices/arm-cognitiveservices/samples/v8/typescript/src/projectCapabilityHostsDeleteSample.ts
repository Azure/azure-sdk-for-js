// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete project capabilityHost.
 *
 * @summary Delete project capabilityHost.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectCapabilityHost/delete.json
 */
async function deleteProjectCapabilityHost(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "test-rg";
  const accountName = "account-1";
  const projectName = "project-1";
  const capabilityHostName = "capabilityHostName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projectCapabilityHosts.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    projectName,
    capabilityHostName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteProjectCapabilityHost();
}

main().catch(console.error);
