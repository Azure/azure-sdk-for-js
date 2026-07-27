// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new threat intelligence indicator.
 *
 * @summary create a new threat intelligence indicator.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/CreateThreatIntelligence.json
 */
async function createANewThreatIntelligence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.createIndicator("myRg", "myWorkspace", {
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
    validFrom: "2021-09-15T17:44:00.114052Z",
    validUntil: "",
  });
  console.log(result);
}

async function main() {
  await createANewThreatIntelligence();
}

main().catch(console.error);
