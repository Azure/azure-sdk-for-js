// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check whether a domain is available.
 *
 * @summary check whether a domain is available.
 * x-ms-original-file: 2026-01-15-preview/CheckDomainAvailability.json
 */
async function checkSKUAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.checkDomainAvailability(
    "contosodemoapp1",
    "Microsoft.CognitiveServices/accounts",
  );
  console.log(result);
}

async function main() {
  await checkSKUAvailability();
}

main().catch(console.error);
