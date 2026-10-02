// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a validation test category catalog entry
 *
 * @summary get a validation test category catalog entry
 * x-ms-original-file: 2026-08-01-preview/ValidationTestCategories_Get_MaximumSet_Gen.json
 */
async function validationTestCategoriesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.validationTestCategories.get("linux-quality-validations");
  console.log(result);
}

async function main(): Promise<void> {
  await validationTestCategoriesGetMaximumSet();
}

main().catch(console.error);
