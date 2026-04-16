// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ClusterPatch} from "@azure/arm-operationalinsights";
import {
  OperationalInsightsManagementClient,
} from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Log Analytics cluster.
 *
 * @summary Updates a Log Analytics cluster.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/ClustersUpdate.json
 */
async function clustersPatch(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const clusterName = "oiautorest6685";
  const parameters: ClusterPatch = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/53bc36c591e14d0992c963b89e571926/resourcegroups/oiautorest6685/providers/MicrosoftManagedIdentity/userAssignedIdentities/myidentity":
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
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clustersPatch();
}

main().catch(console.error);
