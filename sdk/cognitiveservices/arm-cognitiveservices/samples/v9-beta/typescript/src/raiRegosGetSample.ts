// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets one reusable Rego artifact.
 *
 * @summary gets one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/GetRaiRego.json
 */
async function getAReusableRegoArtifact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiRegos.get("resource-group", "safety-account", "input-guard");
  console.log(result);
}

async function main(): Promise<void> {
  await getAReusableRegoArtifact();
}

main().catch(console.error);
