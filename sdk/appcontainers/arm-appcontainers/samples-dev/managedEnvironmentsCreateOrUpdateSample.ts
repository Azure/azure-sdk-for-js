// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ManagedEnvironment} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Managed Environment used to host container apps.
 *
 * @summary Creates or updates a Managed Environment used to host container apps.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ManagedEnvironments_CustomInfrastructureResourceGroup_Create.json
 */
async function createEnvironmentWithCustomInfrastructureResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const environmentEnvelope: ManagedEnvironment = {
    appLogsConfiguration: {
      logAnalyticsConfiguration: { customerId: "string", sharedKey: "string" },
    },
    customDomainConfiguration: {
      certificatePassword: "1234",
      certificateValue: Buffer.from("Y2VydA=="),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    infrastructureResourceGroup: "myInfrastructureRgName",
    location: "East US",
    vnetConfiguration: {
      infrastructureSubnetId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/RGName/providers/Microsoft.Network/virtualNetworks/VNetName/subnets/subnetName1",
    },
    workloadProfiles: [
      {
        name: "My-GP-01",
        maximumCount: 12,
        minimumCount: 3,
        workloadProfileType: "GeneralPurpose",
      },
      {
        name: "My-MO-01",
        maximumCount: 6,
        minimumCount: 3,
        workloadProfileType: "MemoryOptimized",
      },
      {
        name: "My-CO-01",
        maximumCount: 6,
        minimumCount: 3,
        workloadProfileType: "ComputeOptimized",
      },
      { name: "My-consumption-01", workloadProfileType: "Consumption" },
    ],
    zoneRedundant: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    environmentEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a Managed Environment used to host container apps.
 *
 * @summary Creates or updates a Managed Environment used to host container apps.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/ManagedEnvironments_CreateOrUpdate.json
 */
async function createEnvironments(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const environmentEnvelope: ManagedEnvironment = {
    appLogsConfiguration: {
      logAnalyticsConfiguration: { customerId: "string", sharedKey: "string" },
    },
    customDomainConfiguration: {
      certificatePassword: "1234",
      certificateValue: Buffer.from("Y2VydA=="),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/contosoResources/providers/MicrosoftManagedIdentity/userAssignedIdentities/contosoIdentity":
          {},
      },
    },
    ingressConfiguration: {
      headerCountLimit: 30,
      requestIdleTimeout: 5,
      terminationGracePeriodSeconds: 3600,
      workloadProfileName: "My-CO-01",
    },
    location: "East US",
    peerAuthentication: { mtls: { enabled: true } },
    peerTrafficConfiguration: { encryption: { enabled: true } },
    vnetConfiguration: {
      infrastructureSubnetId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/RGName/providers/Microsoft.Network/virtualNetworks/VNetName/subnets/subnetName1",
    },
    workloadProfiles: [
      {
        name: "My-GP-01",
        maximumCount: 12,
        minimumCount: 3,
        workloadProfileType: "GeneralPurpose",
      },
      {
        name: "My-MO-01",
        maximumCount: 6,
        minimumCount: 3,
        workloadProfileType: "MemoryOptimized",
      },
      {
        name: "My-CO-01",
        maximumCount: 6,
        minimumCount: 3,
        workloadProfileType: "ComputeOptimized",
      },
      { name: "My-consumption-01", workloadProfileType: "Consumption" },
    ],
    zoneRedundant: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    environmentName,
    environmentEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createEnvironmentWithCustomInfrastructureResourceGroup();
  await createEnvironments();
}

main().catch(console.error);
