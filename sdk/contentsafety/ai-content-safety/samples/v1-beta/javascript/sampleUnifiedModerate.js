// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to evaluate an Agent Hooks input with a named policy.
 */

const { ContentSafetyClient } = require("@azure/ai-content-safety");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function main() {
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
  const policyId = process.env["CONTENT_SAFETY_POLICY_ID"] || "<policy-id>";

  const client = new ContentSafetyClient(endpoint, new DefaultAzureCredential());
  const input = { content: "Text to evaluate", role: "user" };
  const result = await client.unifiedModerate(
    {
      spec: "agent-hooks/0.1",
      interceptionPoint: "input",
      timestamp: new Date(),
      sequence: 1,
      agent: { id: "<agent-id>", framework: "custom" },
      session: { id: "<session-id>" },
      input,
      target: input,
    },
    { policyId },
  );

  console.log("Decision:", result.verdict.decision);
  console.log("Receipt profile:", result.receipt.profile);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
