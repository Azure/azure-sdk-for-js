// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a threat intelligence indicator.
 *
 * @summary delete a threat intelligence indicator.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/DeleteThreatIntelligence.json
 */
async function deleteAThreatIntelligenceIndicator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.threatIntelligenceIndicator.delete(
    "myRg",
    "myWorkspace",
    "d9cd6f0b-96b9-3984-17cd-a779d1e15a93",
  );
}

async function main(): Promise<void> {
  await deleteAThreatIntelligenceIndicator();
}

main().catch(console.error);
