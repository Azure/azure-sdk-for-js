// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-regulatedenvironmentmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a landing zone configuration.
 *
 * @summary update a landing zone configuration.
 * x-ms-original-file: 2025-02-27-preview/LandingZoneConfigurationOperations_Update.json
 */
async function landingZoneConfigurationOperationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.landingZoneConfigurationOperations.update(
    "ExampleResourceGroup",
    "ExampleLZA",
    "ExampleLZC",
    {
      properties: {
        ddosProtectionCreationOption: "Yes",
        logAnalyticsWorkspaceCreationOption: "No",
        firewallCreationOption: "Standard",
        logRetentionInDays: 540,
        hubNetworkCidrBlock: "10.20.255.0/24",
        azureBastionCreationOption: "Yes",
        tags: [
          { name: "tag1", value: "do" },
          { name: "tag2", value: "do" },
        ],
        firewallSubnetCidrBlock: "10.20.255.0/24",
        gatewaySubnetCidrBlock: "10.20.255.0/24",
        azureBastionSubnetCidrBlock: "10.20.255.0/24",
        landingZonesMgChildren: [{ policyInitiativesAssignmentProperties: [], name: "Corp" }],
        topLevelMgMetadata: {
          policyInitiativesAssignmentProperties: [
            {
              policyInitiativeId:
                "/providers/Microsoft.Authorization/policySetDefinitions/0a2ebd47-3fb9-4735-a006-b7f31ddadd9f",
              assignmentParameters: { Effect: Audit },
            },
          ],
        },
        landingZonesMgMetadata: { policyInitiativesAssignmentProperties: [] },
        platformMgMetadata: { policyInitiativesAssignmentProperties: [] },
        platformManagementMgMetadata: {
          policyInitiativesAssignmentProperties: [],
        },
        platformConnectivityMgMetadata: {
          policyInitiativesAssignmentProperties: [],
        },
        platformIdentityMgMetadata: {
          policyInitiativesAssignmentProperties: [],
        },
        decommissionedMgMetadata: {
          policyInitiativesAssignmentProperties: [],
          create: false,
        },
        sandboxMgMetadata: {
          policyInitiativesAssignmentProperties: [],
          create: true,
        },
        managedIdentity: { type: "SystemAssigned" },
        platformMgChildren: [
          { policyInitiativesAssignmentProperties: [], name: "childmg1" },
          { policyInitiativesAssignmentProperties: [], name: "childmg2" },
        ],
        namingConventionFormula: "{ResourceTypeAbbreviation}",
        customNamingConvention: [{ formula: "{DeploymentSuffix}", resourceType: "azureFirewalls" }],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await landingZoneConfigurationOperationsUpdate();
}

main().catch(console.error);
