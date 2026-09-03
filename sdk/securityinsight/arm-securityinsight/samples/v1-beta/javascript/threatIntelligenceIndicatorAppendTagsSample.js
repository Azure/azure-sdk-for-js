// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to append tags to a threat intelligence indicator.
 *
 * @summary append tags to a threat intelligence indicator.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/AppendTagsThreatIntelligence.json
 */
async function appendTagsToAThreatIntelligenceIndicator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.threatIntelligenceIndicator.appendTags(
    "myRg",
    "myWorkspace",
    "d9cd6f0b-96b9-3984-17cd-a779d1e15a93",
    { threatIntelligenceTags: ["tag1", "tag2"] },
  );
}

async function main() {
  await appendTagsToAThreatIntelligenceIndicator();
}

main().catch(console.error);
