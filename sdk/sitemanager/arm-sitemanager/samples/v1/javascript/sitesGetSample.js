// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Site
 *
 * @summary get a Site
 * x-ms-original-file: 2025-06-01/Sites_Get_MaximumSet_Gen.json
 */
async function getSiteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sites.get("rgsites", "string");
  console.log(result);
}

async function main() {
  await getSiteGeneratedByMaximumSetRule();
}

main().catch(console.error);
