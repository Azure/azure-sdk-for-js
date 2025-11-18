// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary Resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/ActivateSaaS.json
 */
async function activateSaaS() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const request = {
    publisherId: "publisherId",
    saasGuid: "00000000-0000-0000-0000-000005430000",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.saaS.activateResource(request);
  console.log(result);
}

async function main() {
  await activateSaaS();
}

main().catch(console.error);
