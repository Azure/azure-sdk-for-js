// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a RecoveryPlan
 *
 * @summary update a RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlans_Update_MaximumSet_Gen.json
 */
async function recoveryPlansUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryPlans.update("sampleServiceGroupName", "samplePlanName", {
    properties: {
      planDescription: "my sample recovery plan",
      recoveryGroupsSetting: {
        defaultGroup: {
          properties: {
            groupUniqueId: "b7e2a1c4-9f3b-4e2d-8c6a-2f7e4d1b5a9f",
            orderId: 3,
            description: "sample-recoverygroup",
            preActions: [
              { name: "sample-group-action", type: "CustomRunbook", timeoutInMinutes: 29 },
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
              { name: "sample-group-action", type: "CustomRunbook", timeoutInMinutes: 29 },
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
    identity: { type: "UserAssigned", userAssignedIdentities: { key7088: {} } },
  });
  console.log(result);
}

async function main() {
  await recoveryPlansUpdateMaximumSet();
}

main().catch(console.error);
