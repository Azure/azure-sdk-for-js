// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Drill
 *
 * @summary create a Drill
 * x-ms-original-file: 2026-08-31-preview/Drills_Create_MaximumSet_Gen.json
 */
async function drillsCreateMaximumSet(): Promise<void> {
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
          {
            sliId:
              "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.Monitor/slis/checkout-latency",
            type: "Latency",
          },
        ],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await drillsCreateMaximumSet();
}

main().catch(console.error);
