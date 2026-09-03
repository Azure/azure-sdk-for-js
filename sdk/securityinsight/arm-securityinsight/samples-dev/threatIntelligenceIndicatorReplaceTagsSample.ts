// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to replace tags added to a threat intelligence indicator.
 *
 * @summary replace tags added to a threat intelligence indicator.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/ReplaceTagsThreatIntelligence.json
 */
async function replaceTagsToAThreatIntelligence(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.replaceTags(
    "myRg",
    "myWorkspace",
    "d9cd6f0b-96b9-3984-17cd-a779d1e15a93",
    {
      etag: '"0000262c-0000-0800-0000-5e9767060000"',
      kind: "indicator",
      threatIntelligenceTags: ["patching tags"],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await replaceTagsToAThreatIntelligence();
}

main().catch(console.error);
