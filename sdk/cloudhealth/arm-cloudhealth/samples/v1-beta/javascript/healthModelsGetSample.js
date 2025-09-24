// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a HealthModel
 *
 * @summary get a HealthModel
 * x-ms-original-file: 2025-05-01-preview/HealthModels_Get.json
 */
async function healthModelsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.get("rgopenapi", "myHealthModel");
  console.log(result);
}

async function main() {
  await healthModelsGet();
}

main().catch(console.error);
