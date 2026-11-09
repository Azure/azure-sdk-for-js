// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdate.json
 */
async function cacheRuleUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    credentialSetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/credentialSets/myCredentialSet2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateAwsAuthentication.json
 */
async function updateAWSAuthenticationWhilePreservingOmittedFields() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    additionalAuthenticationProperties: {
      authenticationType: "AwsElasticContainerRegistry",
      roleName: "updated-ecr-pull-role",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateConfigureAwsAuthentication.json
 */
async function configureAWSAuthenticationOnAnExistingCacheRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myUserAssignedIdentity":
          {},
      },
    },
    additionalAuthenticationProperties: {
      authenticationType: "AwsElasticContainerRegistry",
      accountNumber: "123456789012",
      region: "us-west-2",
      roleName: "my-ecr-pull-role",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateConfigureEntraAuthentication.json
 */
async function configureEntraAuthenticationOnAnExistingCacheRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myUserAssignedIdentity":
          {},
      },
    },
    additionalAuthenticationProperties: {
      authenticationType: "EntraFederatedIdentityCredential",
      sourceTenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      federatedApplicationClientId: "abcdef12-3456-7890-abcd-ef1234567890",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateConfigureGoogleAuthentication.json
 */
async function configureGoogleAuthenticationOnAnExistingCacheRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myUserAssignedIdentity":
          {},
      },
    },
    additionalAuthenticationProperties: {
      authenticationType: "GoogleArtifactRegistry",
      projectNumber: "123456789012",
      workloadIdentityPool: "my-workload-identity-pool",
      workloadIdentityProvider: "my-workload-identity-provider",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateEntraAuthentication.json
 */
async function updateEntraAuthenticationWhilePreservingOmittedFields() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    additionalAuthenticationProperties: {
      authenticationType: "EntraFederatedIdentityCredential",
      federatedApplicationClientId: "fedcba98-7654-3210-abcd-ef1234567890",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-10-15-preview/CacheRuleUpdateGoogleAuthentication.json
 */
async function updateGoogleAuthenticationWhilePreservingOmittedFields() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    additionalAuthenticationProperties: {
      authenticationType: "GoogleArtifactRegistry",
      workloadIdentityProvider: "updated-identity-provider",
    },
  });
  console.log(result);
}

async function main() {
  await cacheRuleUpdate();
  await updateAWSAuthenticationWhilePreservingOmittedFields();
  await configureAWSAuthenticationOnAnExistingCacheRule();
  await configureEntraAuthenticationOnAnExistingCacheRule();
  await configureGoogleAuthenticationOnAnExistingCacheRule();
  await updateEntraAuthenticationWhilePreservingOmittedFields();
  await updateGoogleAuthenticationWhilePreservingOmittedFields();
}

main().catch(console.error);
