// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a CommunityResource
 *
 * @summary update a CommunityResource
 * x-ms-original-file: 2026-03-01-preview/Community_Update.json
 */
async function communityUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.community.update("rgopenapi", "TestMyCommunity", {
    tags: { sampletag: "samplevalue" },
    properties: {
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
        enclaveCreation: { approvalPolicy: "Required", minimumApproversRequired: 1 },
        connectionCreation: { approvalPolicy: "Required", minimumApproversRequired: 1 },
        connectionUpdate: { approvalPolicy: "NotRequired" },
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
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await communityUpdate();
}

main().catch(console.error);
