// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a template by its identifier.
 *
 * @summary gets a template by its identifier.
 * x-ms-original-file: 2025-07-01-preview/contentTemplates/GetProductTemplateById.json
 */
async function getATemplate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.productTemplate.get(
    "myRg",
    "myWorkspace",
    "8365ebfe-a381-45b7-ad08-7d818070e11f",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getATemplate();
}

main().catch(console.error);
