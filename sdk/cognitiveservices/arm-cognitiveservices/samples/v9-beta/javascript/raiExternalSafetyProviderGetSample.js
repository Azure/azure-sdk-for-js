// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified external safety provider associated with the Subscription
 *
 * @summary gets the specified external safety provider associated with the Subscription
 * x-ms-original-file: 2026-01-15-preview/GetRaiExternalSafetyProvider.json
 */
async function getRaiExternalSafetyProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiExternalSafetyProvider.get("safetyProviderName");
  console.log(result);
}

async function main() {
  await getRaiExternalSafetyProvider();
}

main().catch(console.error);
