// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2025-05-01-preview/ActivateSaaS.json
 */
async function activateSaaS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.saaS.activateResource({
    publisherId: "publisherId",
    saasGuid: "00000000-0000-0000-0000-000005430000",
  });
  console.log(result);
}

async function main() {
  await activateSaaS();
}

main().catch(console.error);
