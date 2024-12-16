// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthDataAIServicesClient } = require("@azure/arm-healthdataaiservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DeidService
 *
 * @summary delete a DeidService
 * x-ms-original-file: 2024-09-20/DeidServices_Delete_MaximumSet_Gen.json
 */
async function deidServicesDeleteGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  await client.deidServices.delete("rgopenapi", "deidTest");
}

async function main() {
  deidServicesDeleteGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
