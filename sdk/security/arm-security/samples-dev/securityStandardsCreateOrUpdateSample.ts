// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a security standard over a given scope
 *
 * @summary creates or updates a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/PutByManagementGroupSecurityStandard_example.json
 */
async function createOrUpdateSecurityStandardOverManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.createOrUpdate(
    "providers/Microsoft.Management/managementGroups/contoso",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
    {
      description: "description of Azure Test Security Standard 1",
      assessments: [
        { assessmentKey: "1195afff-c881-495e-9bc5-1486211ae03f" },
        { assessmentKey: "dbd0cb49-b563-45e7-9724-889e799fa648" },
      ],
      cloudProviders: ["GCP"],
      displayName: "Azure Test Security Standard 1",
      policySetDefinitionId:
        "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/providers/Microsoft.Authorization/policySetDefinitions/patchorchestration-applicationversions",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a security standard over a given scope
 *
 * @summary creates or updates a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/PutBySecurityConnectorSecurityStandard_example.json
 */
async function createOrUpdateSecurityStandardOverSecurityConnectorScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.createOrUpdate(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
    {
      description: "description of Azure Test Security Standard 1",
      assessments: [
        { assessmentKey: "1195afff-c881-495e-9bc5-1486211ae03f" },
        { assessmentKey: "dbd0cb49-b563-45e7-9724-889e799fa648" },
      ],
      cloudProviders: ["GCP"],
      displayName: "Azure Test Security Standard 1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a security standard over a given scope
 *
 * @summary creates or updates a security standard over a given scope
 * x-ms-original-file: 2024-08-01/SecurityStandards/PutBySubscriptionSecurityStandard_example.json
 */
async function createOrUpdateSecurityStandardOverSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.securityStandards.createOrUpdate(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
    {
      description: "description of Azure Test Security Standard 1",
      assessments: [
        { assessmentKey: "1195afff-c881-495e-9bc5-1486211ae03f" },
        { assessmentKey: "dbd0cb49-b563-45e7-9724-889e799fa648" },
      ],
      cloudProviders: ["GCP"],
      displayName: "Azure Test Security Standard 1",
      policySetDefinitionId:
        "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/providers/Microsoft.Authorization/policySetDefinitions/patchorchestration-applicationversions",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSecurityStandardOverManagementGroupScope();
  await createOrUpdateSecurityStandardOverSecurityConnectorScope();
  await createOrUpdateSecurityStandardOverSubscriptionScope();
}

main().catch(console.error);
