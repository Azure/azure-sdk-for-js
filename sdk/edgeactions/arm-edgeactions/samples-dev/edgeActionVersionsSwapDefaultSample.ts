// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_SwapDefault.json
 */
async function swapDefaultVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnClient(credential, subscriptionId);
  await client.edgeActionVersions.swapDefault("testrg", "edgeAction1", "1.0");
}

async function main(): Promise<void> {
  await swapDefaultVersion();
}

main().catch(console.error);
