// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get quota by name for an account.
 *
 * @summary get quota by name for an account.
 * x-ms-original-file: 2024-12-01/AccountQuotas_Get.json
 */
async function accountQuotasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  const result = await client.accountQuotas.get(
    "dummyrg",
    "myPlaywrightAccount",
    "ScalableExecution",
  );
  console.log(result);
}

async function main() {
  accountQuotasGet();
}

main().catch(console.error);
