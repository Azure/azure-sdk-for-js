// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List Location Based ModelCapacities.
 *
 * @summary List Location Based ModelCapacities.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListLocationBasedModelCapacities.json
 */
async function listLocationBasedModelCapacities(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const location = "WestUS";
  const modelFormat = "OpenAI";
  const modelName = "ada";
  const modelVersion = "1";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.locationBasedModelCapacities.list(
    location,
    modelFormat,
    modelName,
    modelVersion,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listLocationBasedModelCapacities();
}

main().catch(console.error);
