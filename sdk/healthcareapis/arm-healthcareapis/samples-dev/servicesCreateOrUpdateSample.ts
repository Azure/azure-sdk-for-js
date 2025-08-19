// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServicesDescription } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update the metadata of a service instance.
 *
 * @summary Create or update the metadata of a service instance.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/legacy/ServiceCreate.json
 */
async function createOrUpdateAServiceWithAllParameters(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "rg1";
  const resourceName = "service1";
  const serviceDescription: ServicesDescription = {
    identity: { type: "SystemAssigned" },
    kind: "fhir-R4",
    location: "westus2",
    properties: {
      accessPolicies: [
        { objectId: "c487e7d1-3210-41a3-8ccc-e9372b78da47" },
        { objectId: "5b307da8-43d4-492b-8b66-b0294ade872f" },
      ],
      authenticationConfiguration: {
        audience: "https://azurehealthcareapis.com",
        authority: "https://login.microsoftonline.com/abfde7b2-df0f-47e6-aabf-2462b07508dc",
        smartProxyEnabled: true,
      },
      corsConfiguration: {
        allowCredentials: false,
        headers: ["*"],
        maxAge: 1440,
        methods: ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"],
        origins: ["*"],
      },
      cosmosDbConfiguration: {
        keyVaultKeyUri: "https://my-vault.vault.azure.net/keys/my-key",
        offerThroughput: 1000,
      },
      exportConfiguration: { storageAccountName: "existingStorageAccount" },
      privateEndpointConnections: [],
      publicNetworkAccess: "Disabled",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    serviceDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the metadata of a service instance.
 *
 * @summary Create or update the metadata of a service instance.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/legacy/ServiceCreateInDataSovereignRegionWithCmkEnabled.json
 */
async function createOrUpdateAServiceWithAllParametersAndCmkEnabledInADataSovereignRegion(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "rg1";
  const resourceName = "service1";
  const serviceDescription: ServicesDescription = {
    identity: { type: "SystemAssigned" },
    kind: "fhir-R4",
    location: "Southeast Asia",
    properties: {
      accessPolicies: [
        { objectId: "c487e7d1-3210-41a3-8ccc-e9372b78da47" },
        { objectId: "5b307da8-43d4-492b-8b66-b0294ade872f" },
      ],
      authenticationConfiguration: {
        audience: "https://azurehealthcareapis.com",
        authority: "https://login.microsoftonline.com/abfde7b2-df0f-47e6-aabf-2462b07508dc",
        smartProxyEnabled: true,
      },
      corsConfiguration: {
        allowCredentials: false,
        headers: ["*"],
        maxAge: 1440,
        methods: ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"],
        origins: ["*"],
      },
      cosmosDbConfiguration: {
        crossTenantCmkApplicationId: "de3fbeef-8c3a-428e-8b9f-4d229c8a85f4",
        keyVaultKeyUri: "https://my-vault.vault.azure.net/keys/my-key",
        offerThroughput: 1000,
      },
      exportConfiguration: { storageAccountName: "existingStorageAccount" },
      privateEndpointConnections: [],
      publicNetworkAccess: "Disabled",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    serviceDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update the metadata of a service instance.
 *
 * @summary Create or update the metadata of a service instance.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/legacy/ServiceCreateMinimum.json
 */
async function createOrUpdateAServiceWithMinimumParameters(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "rg1";
  const resourceName = "service2";
  const serviceDescription: ServicesDescription = {
    kind: "fhir-R4",
    location: "westus2",
    properties: {
      accessPolicies: [{ objectId: "c487e7d1-3210-41a3-8ccc-e9372b78da47" }],
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    serviceDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAServiceWithAllParameters();
  await createOrUpdateAServiceWithAllParametersAndCmkEnabledInADataSovereignRegion();
  await createOrUpdateAServiceWithMinimumParameters();
}

main().catch(console.error);
