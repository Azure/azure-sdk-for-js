// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an authentication policy with the specified name within a resource group.
 *
 * @summary creates or updates an authentication policy with the specified name within a resource group.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyCreateOrUpdate.json
 */
async function createsOrUpdatesAUserSignInAuthenticationPolicyWithinAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.authenticationPolicies.createOrUpdate("rg1", "authPolicy1", {
    location: "eastus",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/authPolicyUami":
          {},
      },
    },
    properties: {
      userTrustProviderType: "entra",
      onUnauthenticatedRequest: "authenticate",
      authenticationProperties: {
        issuer: "https://login.microsoftonline.com/11111111-1111-1111-1111-111111111111/",
        clientId: "00000000-0000-0000-0000-000000000001",
        clientSecret: "https://myvault.vault.azure.net/secrets/mysecret",
        scope: ["openid", "profile"],
        sessionTimeout: "86400",
        sessionCookieName: "ApplicationGatewayUserSession",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an authentication policy with the specified name within a resource group.
 *
 * @summary creates or updates an authentication policy with the specified name within a resource group.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyCreateOrUpdateJwtValidation.json
 */
async function createsOrUpdatesAJWTValidationAuthenticationPolicyWithinAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.authenticationPolicies.createOrUpdate("rg1", "jwtValidationPolicy", {
    location: "eastus",
    properties: {
      userTrustProviderType: "entra",
      onUnauthenticatedRequest: "deny",
      authenticationProperties: {
        issuer: "https://login.microsoftonline.com/11111111-1111-1111-1111-111111111111/",
        clientId: "00000000-0000-0000-0000-000000000001",
        jwksUri:
          "https://login.microsoftonline.com/11111111-1111-1111-1111-111111111111/discovery/v2.0/keys",
        audience: "api://myapp",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAUserSignInAuthenticationPolicyWithinAResourceGroup();
  await createsOrUpdatesAJWTValidationAuthenticationPolicyWithinAResourceGroup();
}

main().catch(console.error);
