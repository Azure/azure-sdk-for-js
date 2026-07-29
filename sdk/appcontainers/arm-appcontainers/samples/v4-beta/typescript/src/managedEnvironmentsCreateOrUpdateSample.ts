// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Managed Environment used to host container apps.
 *
 * @summary creates or updates a Managed Environment used to host container apps.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_CreateOrUpdate.json
 */
async function createEnvironments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.createOrUpdate("examplerg", "testcontainerenv", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-identity":
          {},
      },
    },
    location: "East US",
    appInsightsConfiguration: {
      connectionString:
        "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/",
    },
    appLogsConfiguration: {
      logAnalyticsConfiguration: {
        customerId: "string",
        dynamicJsonColumns: true,
        sharedKey: "string",
      },
    },
    availabilityZones: ["1", "2", "3"],
    customDomainConfiguration: {
      certificatePassword: "1234",
      certificateValue: Buffer.from("Y2VydA==", "base64"),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    diskEncryptionConfiguration: {
      keyVaultConfiguration: {
        auth: {
          identity:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-identity",
        },
        keyUrl: "https://contoso.vault.azure.net/mykey/19ff8313ca394b89b9e824bbbdc8c521",
      },
    },
    ingressConfiguration: {
      headerCountLimit: 30,
      requestIdleTimeout: 5,
      terminationGracePeriodSeconds: 3600,
      workloadProfileName: "My-CO-01",
    },
    openTelemetryConfiguration: {
      destinationsConfiguration: {
        dataDogConfiguration: { key: "000000000000000000000000", site: "string" },
        otlpConfigurations: [
          {
            name: "dashboard",
            endpoint: "dashboard.k8s.region.azurecontainerapps.io:80",
            headers: [{ key: "api-key", value: "xxxxxxxxxxx" }],
            insecure: true,
          },
        ],
      },
      logsConfiguration: { destinations: ["appInsights"] },
      metricsConfiguration: { destinations: ["dataDog"], includeKeda: true },
      tracesConfiguration: { destinations: ["appInsights"], includeDapr: true },
    },
    peerAuthentication: { mtls: { enabled: true } },
    peerTrafficConfiguration: { encryption: { enabled: true } },
    vnetConfiguration: {
      infrastructureSubnetId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/RGName/providers/Microsoft.Network/virtualNetworks/VNetName/subnets/subnetName1",
    },
    workloadProfiles: [
      {
        name: "My-GP-01",
        enableFips: true,
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
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Managed Environment used to host container apps.
 *
 * @summary creates or updates a Managed Environment used to host container apps.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_CustomInfrastructureResourceGroup_Create.json
 */
async function createEnvironmentWithCustomInfrastructureResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.createOrUpdate("examplerg", "testcontainerenv", {
    location: "East US",
    appLogsConfiguration: {
      logAnalyticsConfiguration: { customerId: "string", sharedKey: "string" },
    },
    availabilityZones: ["1", "2", "3"],
    customDomainConfiguration: {
      certificatePassword: "1234",
      certificateValue: Buffer.from("Y2VydA==", "base64"),
      dnsSuffix: "www.my-name.com",
    },
    daprAIConnectionString:
      "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://northcentralus-0.in.applicationinsights.azure.com/",
    infrastructureResourceGroup: "myInfrastructureRgName",
    vnetConfiguration: {
      infrastructureSubnetId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/RGName/providers/Microsoft.Network/virtualNetworks/VNetName/subnets/subnetName1",
    },
    workloadProfiles: [
      {
        name: "My-GP-01",
        enableFips: true,
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
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createEnvironments();
  await createEnvironmentWithCustomInfrastructureResourceGroup();
}

main().catch(console.error);
