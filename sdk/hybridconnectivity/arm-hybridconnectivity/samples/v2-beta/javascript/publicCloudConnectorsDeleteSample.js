// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PublicCloudConnector
 *
 * @summary delete a PublicCloudConnector
 * x-ms-original-file: 2024-12-01/PublicCloudConnectors_Delete.json
 */
async function publicCloudConnectorsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  await client.publicCloudConnectors.delete("rgpublicCloud", "skcfyjvflkhibdywjay");
}

async function main() {
  await publicCloudConnectorsDelete();
}

main().catch(console.error);
