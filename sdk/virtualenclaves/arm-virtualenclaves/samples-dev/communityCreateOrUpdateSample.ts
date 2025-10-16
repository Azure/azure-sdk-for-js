// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CommunityResource
 *
 * @summary create a CommunityResource
 * x-ms-original-file: 2025-05-01-preview/Community_CreateOrUpdate.json
 */
async function communityCreateOrUpdate(): Promise<void> {
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
      addressSpace: "10.0.0.0/24",
      dnsServers: ["azure.net"],
      governedServiceList: [
        {
          serviceId: "AKS",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "AppService",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "ContainerRegistry",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "CosmosDB",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "KeyVault",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
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
        {
          serviceId: "PostgreSQL",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "ServiceBus",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "Storage",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "AzureFirewalls",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "Insights",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
        {
          serviceId: "Logic",
          option: "Allow",
          enforcement: "Enabled",
          policyAction: "None",
        },
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
        },
        {
          roleDefinitionId: "18d7d88d-d35e-4fb5-a5c3-7773c20a72d9",
          principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        },
      ],
      approvalSettings: {
        endpointCreation: "NotRequired",
        endpointUpdate: "Required",
        endpointDeletion: "NotRequired",
        connectionCreation: "Required",
        connectionUpdate: "Required",
        connectionDeletion: "NotRequired",
        enclaveCreation: "NotRequired",
        enclaveDeletion: "NotRequired",
        maintenanceMode: "NotRequired",
        serviceCatalogDeployment: "NotRequired",
        notificationOnApprovalCreation: "NotRequired",
        notificationOnApprovalAction: "NotRequired",
        notificationOnApprovalDeletion: "NotRequired",
        mandatoryApprovers: [{ approverEntraId: "00000000-0000-0000-0000-000000000000" }],
        minimumApproversRequired: 0,
      },
      maintenanceModeConfiguration: {
        mode: "Off",
        principals: [{ id: "355a6bb0-abc0-4cba-000d-12a345b678c9", type: "User" }],
        justification: "Off",
      },
      firewallSku: "Standard",
    },
    tags: { sampletag: "samplevalue" },
    location: "westcentralus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await communityCreateOrUpdate();
}

main().catch(console.error);
