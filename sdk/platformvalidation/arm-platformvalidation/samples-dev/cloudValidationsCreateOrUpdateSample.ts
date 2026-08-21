// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a cloud validation
 *
 * @summary create or update a cloud validation
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function cloudValidationsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const result = await client.cloudValidations.createOrUpdate("rgvalidate", "cvtest01", {
    properties: { description: "ezutdlxrzaemjqpqpandwfixfkfk", overallState: "Enabled" },
    tags: { key2277: "hspkpujzhlthqsisfkvwgsfajnxws" },
    location: "byryro",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudValidationsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
