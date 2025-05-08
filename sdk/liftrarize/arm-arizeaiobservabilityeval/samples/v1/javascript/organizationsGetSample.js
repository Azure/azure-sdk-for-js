// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityEvalClient } = require("@azure/arm-arizeaiobservabilityeval");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-10-01/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4DEBE8B4-8BA4-42F8-AE50-FBEF318751D1";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.get("rgopenapi", "test-organization-1");
  console.log(result);
}

async function main() {
  await organizationsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
