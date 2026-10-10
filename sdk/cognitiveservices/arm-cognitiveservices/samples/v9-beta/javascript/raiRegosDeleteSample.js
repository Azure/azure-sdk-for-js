// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes one reusable Rego artifact.
 *
 * @summary deletes one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/DeleteRaiRego.json
 */
async function deleteAReusableRegoArtifact() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiRegos.delete("resource-group", "safety-account", "input-guard", {
    ifMatch: '"00000000-0000-0000-0000-000000000001"',
  });
}

async function main() {
  await deleteAReusableRegoArtifact();
}

main().catch(console.error);
