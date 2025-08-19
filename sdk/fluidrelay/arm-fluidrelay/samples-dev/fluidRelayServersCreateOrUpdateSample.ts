// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update a Fluid Relay server.
 *
 * @summary Create or Update a Fluid Relay server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_CreateOrUpdate.json
 */

import type { FluidRelayServer } from "@azure/arm-fluidrelay";
import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAFluidRelayServer(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const resource: FluidRelayServer = {
    identity: { type: "SystemAssigned" },
    location: "west-us",
    storagesku: "basic",
    tags: { category: "sales" },
  };
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.createOrUpdate(
    resourceGroup,
    fluidRelayServerName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update a Fluid Relay server.
 *
 * @summary Create or Update a Fluid Relay server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_CreateWithAmi.json
 */
async function createAFluidRelayServerWithAmi(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const resource: FluidRelayServer = {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/xxxxXxxxXxxxXxxx/resourceGroups/myResourceGroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
        "/subscriptions/xxxxXxxxXxxxXxxx/resourceGroups/myResourceGroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/id2":
          {},
      },
    },
    location: "west-us",
    storagesku: "basic",
    tags: { category: "sales" },
  };
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.createOrUpdate(
    resourceGroup,
    fluidRelayServerName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update a Fluid Relay server.
 *
 * @summary Create or Update a Fluid Relay server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_CreateWithCmk.json
 */
async function createAFluidRelayServerWithCmk(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const resource: FluidRelayServer = {
    encryption: {
      customerManagedKeyEncryption: {
        keyEncryptionKeyIdentity: {
          identityType: "UserAssigned",
          userAssignedIdentityResourceId:
            "/subscriptions/xxxx-xxxx-xxxx-xxxx/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityForCMK",
        },
        keyEncryptionKeyUrl: "https://contosovault.vault.azure.net/keys/contosokek",
      },
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/xxxxXxxxXxxxXxxx/resourceGroups/myResourceGroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/identityForCMK":
          {},
      },
    },
    location: "west-us",
    storagesku: "basic",
    tags: { category: "sales" },
  };
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.createOrUpdate(
    resourceGroup,
    fluidRelayServerName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAFluidRelayServer();
  await createAFluidRelayServerWithAmi();
  await createAFluidRelayServerWithCmk();
}

main().catch(console.error);
