// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces one reusable Rego artifact.
 *
 * @summary creates or replaces one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/PutRaiRego.json
 */
async function createAReusableRegoArtifact(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiRegos.createOrUpdate(
    "resource-group",
    "safety-account",
    "input-guard",
    {
      properties: {
        encoding: "None",
        rego: 'package input_guard\n\nimport rego.v1\n\ndefault verdict := {"decision": "allow"}\n\nverdict := {"decision": "deny", "reason": "prompt_injection_detected"} if {\n  input.snapshot.moderation.harm.PromptInjection.detected\n}',
      },
      tags: { environment: "production" },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or replaces one reusable Rego artifact.
 *
 * @summary creates or replaces one reusable Rego artifact.
 * x-ms-original-file: 2026-09-15-preview/UpdateRaiRego.json
 */
async function replaceAReusableRegoArtifactConditionally(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiRegos.createOrUpdate(
    "resource-group",
    "safety-account",
    "input-guard",
    {
      properties: {
        encoding: "None",
        rego: 'package input_guard\n\nimport rego.v1\n\ndefault verdict := {"decision": "allow"}\n\nblocking_signal if {\n  input.snapshot.moderation.harm.PromptInjection.detected\n}\n\nblocking_signal if {\n  input.snapshot.moderation.harm.Hate.severity >= 4\n}\n\nverdict := {"decision": "deny", "reason": "unsafe_input"} if {\n  blocking_signal\n}',
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000001"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAReusableRegoArtifact();
  await replaceAReusableRegoArtifactConditionally();
}

main().catch(console.error);
