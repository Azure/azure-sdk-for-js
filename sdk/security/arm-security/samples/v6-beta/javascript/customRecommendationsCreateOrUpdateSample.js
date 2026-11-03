// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a custom recommendation over a given scope
 *
 * @summary creates or updates a custom recommendation over a given scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/PutByManagementGroupCustomRecommendation_example.json
 */
async function createOrUpdateCustomRecommendationOverManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.createOrUpdate(
    "providers/Microsoft.Management/managementGroups/contoso",
    "33e7cc6e-a139-4723-a0e5-76993aee0771",
    {
      description: "organization passwords policy",
      cloudProviders: ["AWS"],
      displayName: "Password Policy",
      query:
        "RawEntityMetadata | where Environment == 'GCP' and Identifiers.Type == 'compute.firewalls' | extend IslogConfigEnabled = tobool(Record.logConfig.enable) | extend HealthStatus = iff(IslogConfigEnabled, 'HEALTHY', 'UNHEALTHY')",
      remediationDescription: "Change password policy to...",
      securityIssue: "Vulnerability",
      severity: "Medium",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a custom recommendation over a given scope
 *
 * @summary creates or updates a custom recommendation over a given scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/PutBySecurityConnectorCustomRecommendation_example.json
 */
async function createOrUpdateCustomRecommendationOverSecurityConnectorScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.createOrUpdate(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "33e7cc6e-a139-4723-a0e5-76993aee0771",
    {
      description: "organization passwords policy",
      cloudProviders: ["AWS"],
      displayName: "Password Policy",
      query:
        "RawEntityMetadata | where Environment == 'GCP' and Identifiers.Type == 'compute.firewalls' | extend IslogConfigEnabled = tobool(Record.logConfig.enable) | extend HealthStatus = iff(IslogConfigEnabled, 'HEALTHY', 'UNHEALTHY')",
      remediationDescription: "Change password policy to...",
      securityIssue: "Vulnerability",
      severity: "Medium",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a custom recommendation over a given scope
 *
 * @summary creates or updates a custom recommendation over a given scope
 * x-ms-original-file: 2024-08-01/CustomRecommendations/PutBySubscriptionCustomRecommendation_example.json
 */
async function createOrUpdateCustomRecommendationOverSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.createOrUpdate(
    "subscriptions/e5d1b86c-3051-44d5-8802-aa65d45a279b",
    "33e7cc6e-a139-4723-a0e5-76993aee0771",
    {
      description: "organization passwords policy",
      cloudProviders: ["AWS"],
      displayName: "Password Policy",
      query:
        "RawEntityMetadata | where Environment == 'GCP' and Identifiers.Type == 'compute.firewalls' | extend IslogConfigEnabled = tobool(Record.logConfig.enable) | extend HealthStatus = iff(IslogConfigEnabled, 'HEALTHY', 'UNHEALTHY')",
      remediationDescription: "Change password policy to...",
      securityIssue: "Vulnerability",
      severity: "Medium",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCustomRecommendationOverManagementGroupScope();
  await createOrUpdateCustomRecommendationOverSecurityConnectorScope();
  await createOrUpdateCustomRecommendationOverSubscriptionScope();
}

main().catch(console.error);
