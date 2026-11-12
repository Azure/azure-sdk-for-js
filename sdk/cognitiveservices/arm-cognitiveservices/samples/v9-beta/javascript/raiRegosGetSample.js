// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets one reusable Rego artifact.
 *
 * @summary gets one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/GetRaiRego.json
 */
async function getAReusableRegoArtifact() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiRegos.get("resource-group", "safety-account", "input-guard");
  console.log(result);
}

async function main() {
  await getAReusableRegoArtifact();
}

main().catch(console.error);
