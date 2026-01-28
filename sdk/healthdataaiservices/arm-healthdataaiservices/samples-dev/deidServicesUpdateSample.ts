// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a DeidService
 *
 * @summary update a DeidService
 * x-ms-original-file: 2026-02-01-preview/DeidServices_Update_MaximumSet_Gen.json
 */
async function deidServicesUpdateGeneratedByMaximumSetRulePreview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const result = await client.deidServices.update("rgopenapi", "deidTest", {
    identity: { type: "None", userAssignedIdentities: {} },
    sku: { name: "Standard", tier: "Standard", capacity: 1 },
    tags: {},
    properties: { publicNetworkAccess: "Enabled" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await deidServicesUpdateGeneratedByMaximumSetRulePreview();
}

main().catch(console.error);
