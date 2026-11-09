// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the result of a previously triggered remediation.
 *
 * @summary fetches the result of a previously triggered remediation.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_RemediationResult.json
 */
async function sovereignViewOperationsRemediationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.remediationResult(
    "ExampleResourceGroup",
    "ExampleSV",
    { remediationId: "2f30c9e8-1b4d-4b4f-a17d-54db32e132f4" },
  );
  console.log(result);
}

async function main() {
  await sovereignViewOperationsRemediationResult();
}

main().catch(console.error);
