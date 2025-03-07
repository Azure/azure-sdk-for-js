// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a landing zone configuration.
 *
 * @summary create a landing zone configuration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_Create.json
 */
async function landingZoneConfigurationOperationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneConfigurationOperations.create(
    "rg-examplegroup",
    "ExampleLZA",
    "ExampleLZC",
    {
      properties: {
        ddosProtectionCreationOption: "UseExisting",
        existingDdosProtectionId:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.Network/ddosProtectionPlans/ddos-example",
        logAnalyticsWorkspaceCreationOption: "UseExisting",
        existingLogAnalyticsWorkspaceId:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.OperationalInsights/workspaces/log-example",
        tags: [
          { name: "tag1", value: "Lorem" },
          { name: "tag2", value: "Ipsum" },
        ],
        firewallCreationOption: "Premium",
        firewallSubnetCidrBlock: "10.20.254.0/24",
        gatewaySubnetCidrBlock: "10.20.252.0/24",
        logRetentionInDays: 540,
        hubNetworkCidrBlock: "10.20.0.0/16",
        azureBastionCreationOption: "UseExisting",
        existingAzureBastionId:
          "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.Network/bastionHosts/bas-example",
        landingZonesMgChildren: [
          { policyInitiativesAssignmentProperties: [], name: "Corp" },
          { policyInitiativesAssignmentProperties: [], name: "Online" },
          {
            policyInitiativesAssignmentProperties: [
              {
                policyInitiativeId:
                  "/providers/Microsoft.Authorization/policySetDefinitions/03de05a4-c324-4ccd-882f-a814ea8ab9ea",
                assignmentParameters: {},
              },
            ],
            name: "Confidential Corp",
          },
          {
            policyInitiativesAssignmentProperties: [
              {
                policyInitiativeId:
                  "/providers/Microsoft.Authorization/policySetDefinitions/03de05a4-c324-4ccd-882f-a814ea8ab9ea",
                assignmentParameters: {},
              },
            ],
            name: "Confidential Online",
          },
        ],
        topLevelMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: {
                listOfAllowedLocations: swedencentral,
                eastus2,
                uksouth,
              },
            },
          ],
        },
        landingZonesMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
        },
        platformMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
        },
        platformManagementMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
        },
        platformConnectivityMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
        },
        platformIdentityMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
        },
        decommissionedMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
          create: true,
        },
        sandboxMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
              assignmentParameters: { listOfAllowedLocations: swedencentral },
            },
          ],
          create: true,
        },
        managedIdentity: {
          type: "UserAssigned",
          userAssignedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/rg-examplegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mi-example",
        },
        platformMgChildren: [
          {
            policyInitiativesAssignmentProperties: [
              {
                policyInitiativeId:
                  "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
                assignmentParameters: { listOfAllowedLocations: swedencentral },
              },
            ],
            name: "Telemetry",
          },
          {
            policyInitiativesAssignmentProperties: [
              {
                policyInitiativeId:
                  "/providers/Microsoft.Authorization/policySetDefinitions/c1cbff38-87c0-4b9f-9f70-035c7a3b5523",
                assignmentParameters: { listOfAllowedLocations: swedencentral },
              },
            ],
            name: "Security",
          },
        ],
        namingConventionFormula:
          "{ResourceTypeAbbreviation}-{DeploymentPrefix}-Contoso-{DeploymentSuffix}-{Environment}",
        customNamingConvention: [
          {
            resourceType: "ddosProtectionPlans",
            formula: "{ResourceTypeAbbreviation}-{DeploymentPrefix}-Contoso-{DeploymentSuffix}",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsCreate();
}

main().catch(console.error);
