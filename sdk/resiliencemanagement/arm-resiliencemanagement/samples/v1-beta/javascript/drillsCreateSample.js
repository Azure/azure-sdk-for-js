// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Drill
 *
 * @summary create a Drill
 * x-ms-original-file: 2026-04-01-preview/Drills_Create_MaximumSet_Gen.json
 */
async function drillsCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.drills.create("sampleServiceGroupName", "drill1", {
    properties: {
      rbacSetupMode: "AutomatedCustomRole",
      drillType: "DrillProperties",
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
      drillAssetProperties: {
        subscription: "4e88bed3-114f-443d-9975-28f64122ec5e",
        region: "eastus",
        resourceGroup: "customDrillResourceGroup",
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
    },
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main() {
  await drillsCreateMaximumSet();
}

main().catch(console.error);
