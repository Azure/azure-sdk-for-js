// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Drill
 *
 * @summary update a Drill
 * x-ms-original-file: 2026-04-01-preview/Drills_Update_MaximumSet_Gen.json
 */
async function drillsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.update("sampleServiceGroupName", "drill1", {
    properties: {
      rbacSetupMode: "AutomatedCustomRole",
      recoveryPlanProperties: {
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
      },
      monitoringProperties: {
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
      },
      chaosResourceProperties: {
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
        chaosResourceIdentityForFaults: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
      },
      drillAssetProperties: { subscription: "pxlmwjuhcif", region: "zuvwzxnbqyzdkthrewruw" },
    },
    identity: { type: "None", userAssignedIdentities: {} },
  });
}

async function main() {
  await drillsUpdateMaximumSet();
}

main().catch(console.error);
