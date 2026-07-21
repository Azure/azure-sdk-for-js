// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a threat Intelligence indicator.
 *
 * @summary update a threat Intelligence indicator.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/UpdateThreatIntelligence.json
 */
async function updateAThreatIntelligenceIndicator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.create(
    "myRg",
    "myWorkspace",
    "d9cd6f0b-96b9-3984-17cd-a779d1e15a93",
    {
      kind: "indicator",
      description: "debugging indicators",
      confidence: 78,
      createdByRef: "contoso@contoso.com",
      displayName: "new schema",
      externalReferences: [],
      granularMarkings: [],
      killChainPhases: [],
      labels: [],
      modified: "",
      pattern: "[url:value = 'https://www.contoso.com']",
      patternType: "url",
      revoked: false,
      source: "Azure Sentinel",
      threatIntelligenceTags: ["new schema"],
      threatTypes: ["compromised"],
      validFrom: "2020-04-15T17:44:00.114052Z",
      validUntil: "",
    },
  );
  console.log(result);
}

async function main() {
  await updateAThreatIntelligenceIndicator();
}

main().catch(console.error);
