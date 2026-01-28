// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesClient } from "@azure/arm-healthdataaiservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DeidService resources by resource group
 *
 * @summary list DeidService resources by resource group
 * x-ms-original-file: 2026-02-01-preview/DeidServices_ListByResourceGroup_MaximumSet_Gen.json
 */
async function deidServicesListByResourceGroupGeneratedByMaximumSetRulePreview(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deidServices.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await deidServicesListByResourceGroupGeneratedByMaximumSetRulePreview();
}

main().catch(console.error);
