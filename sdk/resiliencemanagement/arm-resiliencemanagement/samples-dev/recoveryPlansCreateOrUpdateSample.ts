// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a RecoveryPlan
 *
 * @summary create a RecoveryPlan
 * x-ms-original-file: 2026-11-30-preview/RecoveryPlans_CreateOrUpdate_CyberRecovery.json
 */
async function recoveryPlansCreateOrUpdateCyberRecovery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlans.createOrUpdate("contoso-service-group", "cyber-plan", {
    properties: {
      planType: "CyberRecovery",
      planDescription: "Cyber recovery plan",
      recoveryGroupsSetting: {
        defaultGroup: {
          properties: {
            groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
            orderId: 0,
            description: "Foundation services",
          },
        },
        additionalGroups: [
          {
            properties: {
              groupUniqueId: "5d3c2b1a-8e7f-4a6b-9c0d-1e2f3a4b5c6d",
              orderId: 1,
              description: "Tier 1 applications",
              resiliencyGroupProperties: {
                resiliencyType: "CyberResiliency",
                recoveryConfigProfileAssociations: [
                  {
                    workloadType: "AzureVm",
                    recoveryConfigProfileId:
                      "/providers/Microsoft.Management/serviceGroups/contoso-service-group/providers/Microsoft.AzureResilienceManagement/recoveryPlans/cyber-plan/recoveryConfigProfiles/azure-vm-default",
                  },
                ],
              },
            },
          },
        ],
      },
      resiliencyPlanProperties: {
        resiliencyType: "CyberResiliency",
        targetEnvironment: {
          targetSubscriptionIds: ["12345678-1234-1234-1234-123456789012"],
          targetLocations: ["eastus2"],
        },
      },
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/cyber-recovery-identity":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a RecoveryPlan
 *
 * @summary create a RecoveryPlan
 * x-ms-original-file: 2026-11-30-preview/RecoveryPlans_CreateOrUpdate_MaximumSet_Gen.json
 */
async function recoveryPlansCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlans.createOrUpdate(
    "sampleServiceGroupName",
    "samplePlanName",
    {
      properties: {
        planType: "Regional",
        planDescription: "Sample Plan",
        recoveryGroupsSetting: {
          defaultGroup: {
            properties: {
              groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
              orderId: 0,
              description: "sample recoverygroup",
              preActions: [
                {
                  name: "sample-group-action",
                  description: "sample group action instructions",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
              ],
              postActions: [
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
                {
                  name: "sample-group-action",
                  type: "CustomRunbook",
                  timeoutInMinutes: 29,
                  actionResourceId:
                    "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                  parameters: { key7795: "uvapupcbbdgow" },
                  associatedIdentity: {
                    type: "UserAssigned",
                    userAssignedIdentity:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                  },
                },
              ],
            },
          },
          additionalGroups: [
            {
              properties: {
                groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
                orderId: 1,
                description: "sample recoverygroup",
                preActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
                postActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
              },
            },
            {
              properties: {
                groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
                orderId: 1,
                description: "sample recoverygroup",
                preActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
                postActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
              },
            },
            {
              properties: {
                groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
                orderId: 1,
                description: "sample recoverygroup",
                preActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
                postActions: [
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                  {
                    name: "sample-group-action",
                    type: "CustomRunbook",
                    timeoutInMinutes: 29,
                    actionResourceId:
                      "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.Automation/automationAccounts/sampleAccount/runbooks/sameplRunbooks1",
                    parameters: { key7795: "uvapupcbbdgow" },
                    associatedIdentity: {
                      type: "UserAssigned",
                      userAssignedIdentity:
                        "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/4e88bed3-114f-443d-9975-28f64122ec5e/resourcegroups/resourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami1":
            {},
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryPlansCreateOrUpdateCyberRecovery();
  await recoveryPlansCreateOrUpdateMaximumSet();
}

main().catch(console.error);
