// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a RecoveryPlan
 *
 * @summary create a RecoveryPlan
 * x-ms-original-file: 2026-04-01-preview/RecoveryPlans_CreateOrUpdate_MaximumSet_Gen.json
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
  await recoveryPlansCreateOrUpdateMaximumSet();
}

main().catch(console.error);
