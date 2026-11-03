// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes one reusable Rego artifact.
 *
 * @summary deletes one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/DeleteRaiRego.json
 */
async function deleteAReusableRegoArtifact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiRegos.delete("resource-group", "safety-account", "input-guard", {
    ifMatch: '"00000000-0000-0000-0000-000000000001"',
  });
}

async function main(): Promise<void> {
  await deleteAReusableRegoArtifact();
}

main().catch(console.error);
