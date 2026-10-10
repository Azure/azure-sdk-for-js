// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a PublicCloudConnector
 *
 * @summary update a PublicCloudConnector
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_Update_MaximumSet_Gen.json
 */
async function publicCloudConnectorsUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.publicCloudConnectors.update("rghybridconnectivity", "abc", {
    tags: {},
    properties: { awsCloudProfile: { excludedAccounts: ["zrbtd"] } },
  });
  console.log(result);
}

async function main() {
  await publicCloudConnectorsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
