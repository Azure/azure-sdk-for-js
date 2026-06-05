// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get API key details of a kafka or schema registry cluster
 *
 * @summary get API key details of a kafka or schema registry cluster
 * x-ms-original-file: 2025-08-18-preview/Organization_GetClusterAPIKey_MaximumSet_Gen.json
 */
async function organizationGetClusterAPIKeyMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getClusterAPIKey(
    "rgconfluent",
    "puauqgrwsfgmolfhazfjcavnj",
    "xxsquwnsllkkzuyzlhdxdl",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get API key details of a kafka or schema registry cluster
 *
 * @summary get API key details of a kafka or schema registry cluster
 * x-ms-original-file: 2025-08-18-preview/Organization_GetClusterAPIKey_MinimumSet_Gen.json
 */
async function organizationGetClusterAPIKeyMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getClusterAPIKey(
    "rgconfluent",
    "oiywgdcgyrmdcquutyn",
    "gmgzzzwsoctmbdrgttw",
  );
  console.log(result);
}

async function main() {
  await organizationGetClusterAPIKeyMaximumSet();
  await organizationGetClusterAPIKeyMinimumSet();
}

main().catch(console.error);
