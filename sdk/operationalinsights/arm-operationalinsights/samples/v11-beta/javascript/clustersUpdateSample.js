// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Log Analytics cluster.
 *
 * @summary updates a Log Analytics cluster.
 * x-ms-original-file: 2025-07-01/ClustersUpdate.json
 */
async function clustersPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("oiautorest6685", "oiautorest6685", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/53bc36c5-91e1-4d09-92c9-63b89e571926/resourcegroups/oiautorest6685/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    keyVaultProperties: {
      keyName: "aztest2170cert",
      keyRsaSize: 1024,
      keyVaultUri: "https://aztest2170.vault.azure.net",
      keyVersion: "",
    },
    sku: { name: "CapacityReservation", capacity: 1000 },
    tags: { tag1: "val1" },
  });
  console.log(result);
}

async function main() {
  await clustersPatch();
}

main().catch(console.error);
