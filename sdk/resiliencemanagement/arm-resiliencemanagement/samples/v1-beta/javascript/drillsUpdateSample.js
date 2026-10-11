// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Drill
 *
 * @summary update a Drill
 * x-ms-original-file: 2026-08-31-preview/Drills_Update_MaximumSet_Gen.json
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
      healthModelMonitoringProperties: {
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
        discoveryRuleId:
          "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourceGroups/contoso-health/providers/Microsoft.CloudHealth/healthmodels/contoso-payments-hm/discoveryrules/payments-frontend-rule",
      },
      sliMonitoringProperties: {
        identity: {
          type: "UserAssigned",
          userAssignedIdentity:
            "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
        },
        slis: [
          {
            sliId:
              "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.Monitor/slis/checkout-availability",
            type: "Availability",
          },
        ],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
  });
}

async function main() {
  await drillsUpdateMaximumSet();
}

main().catch(console.error);
