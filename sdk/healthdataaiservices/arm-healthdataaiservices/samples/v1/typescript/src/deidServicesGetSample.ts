// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DeidService
 *
 * @summary get a DeidService
 * x-ms-original-file: 2024-09-20/DeidServices_Get_MaximumSet_Gen.json
 */
async function deidServicesGetGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const result = await client.deidServices.get("rgopenapi", "deidTest");
  console.log(result);
}

async function main() {
  deidServicesGetGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
