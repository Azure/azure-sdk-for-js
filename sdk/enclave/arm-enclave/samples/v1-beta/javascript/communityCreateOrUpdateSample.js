// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-enclave");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CommunityResource
 *
 * @summary create a CommunityResource
 * x-ms-original-file: 2026-03-01-preview/Community_CreateOrUpdate.json
 */
async function communityCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.community.createOrUpdate("rgopenapi", "TestMyCommunity", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    properties: {
      addressSpace: "",
      dnsServers: ["azure.net"],
      governedServiceList: [
        { serviceId: "AKS", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        { serviceId: "AppService", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        {
          serviceId: "ContainerRegistry",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        { serviceId: "CosmosDB", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        { serviceId: "KeyVault", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        {
          serviceId: "MicrosoftSQL",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "Monitoring",
          option: "Not Applicable",
          enforcement: "Enabled",
          policyAction: "None",
        },
        { serviceId: "PostgreSQL", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        { serviceId: "ServiceBus", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        { serviceId: "Storage", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        {
          serviceId: "AzureFirewalls",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        { serviceId: "Insights", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        { serviceId: "Logic", option: "Allow", enforcement: "Enabled", policyAction: "None" },
        {
          serviceId: "PrivateDNSZones",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "DataConnectors",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
      ],
      communityRoleAssignments: [
        {
          roleDefinitionId: "b24988ac-6180-42a0-ab88-20f7382dd24c",
          principals: [
            { id: "01234567-89ab-ef01-2345-0123456789ab", type: "Group" },
            { id: "355a6bb0-abc0-4cba-000d-12a345b678c0", type: "User" },
          ],
          condition: "@RoleDefinition.Name StringNotEquals 'Owner'",
        },
        {
          roleDefinitionId: "18d7d88d-d35e-4fb5-a5c3-7773c20a72d9",
          principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        },
      ],
      granularApprovalSettings: {
        communityEndpointUpdate: {
          approvalPolicy: "Required",
          minimumApproversRequired: 2,
          mandatoryApprovers: [{ approverEntraId: "00000000-0000-0000-0000-000000000001" }],
        },
        enclaveEndpointUpdate: { approvalPolicy: "Required", minimumApproversRequired: 1 },
        enclaveCreation: { approvalPolicy: "NotRequired" },
        connectionCreation: {
          approvalPolicy: "Required",
          minimumApproversRequired: 1,
          mandatoryApprovers: [{ approverEntraId: "00000000-0000-0000-0000-000000000002" }],
        },
        connectionUpdate: { approvalPolicy: "Required", minimumApproversRequired: 1 },
        communityMaintenanceMode: {
          approvalPolicy: "Required",
          minimumApproversRequired: 2,
          mandatoryApprovers: [
            { approverEntraId: "00000000-0000-0000-0000-000000000003" },
            { approverEntraId: "00000000-0000-0000-0000-000000000004" },
          ],
        },
        enclaveMaintenanceMode: { approvalPolicy: "NotRequired" },
      },
      maintenanceModeConfiguration: {
        mode: "Off",
        principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        justification: "Off",
      },
      firewallSku: "Standard",
      monitoringSettings: {
        diagnosticDestinations: [
          { destinationType: "CommunityWorkspace" },
          { destinationType: "EnclaveWorkspace", diagnosticSettingsName: "customName" },
          {
            destinationType: "CustomWorkspace",
            customWorkspaceResourceId:
              "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/rgopenapi/providers/Microsoft.OperationalInsights/workspaces/CustomWorkspace",
            diagnosticSettingsName: "customName",
          },
          {
            destinationType: "CustomWorkspace",
            customWorkspaceResourceId:
              "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/rgopenapi/providers/Microsoft.OperationalInsights/workspaces/CustomWorkspace",
            diagnosticSettingsName: "customName",
          },
        ],
        flowLogDestination: {
          destinationType: "CustomWorkspace",
          customWorkspaceResourceId:
            "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/rgopenapi/providers/Microsoft.OperationalInsights/workspaces/CustomWorkspace",
          diagnosticSettingsName: "customName",
        },
      },
      addressSpaces: ["10.0.0.0/16", "10.1.0.0/16"],
    },
    tags: { sampletag: "samplevalue" },
    location: "westcentralus",
  });
  console.log(result);
}

async function main() {
  await communityCreateOrUpdate();
}

main().catch(console.error);
