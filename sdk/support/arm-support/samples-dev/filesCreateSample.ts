/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { FileDetails } from "@azure/arm-support";
import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new file under a workspace for the specified subscription.
 *
 * @summary Creates a new file under a workspace for the specified subscription.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateFileForSubscription.json
 */
async function createAFileUnderASubscriptionWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] || "132d901f-189d-4381-9214-fe68e27e05a1";
  const fileWorkspaceName = "testworkspace";
  const fileName = "test.txt";
  const createFileParameters: FileDetails = {
    chunkSize: 41423,
    fileSize: 41423,
    numberOfChunks: 1,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.files.create(fileWorkspaceName, fileName, createFileParameters);
  console.log(result);
}

async function main(): Promise<void> {
  await createAFileUnderASubscriptionWorkspace();
}

main().catch(console.error);
