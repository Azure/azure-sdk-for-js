// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the metadata of a service instance.
 *
 * @summary create or update the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreate.json
 */
async function createOrUpdateAServiceWithAllParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "service1", {
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
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of a service instance.
 *
 * @summary create or update the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreateInDataSovereignRegionWithCmkEnabled.json
 */
async function createOrUpdateAServiceWithAllParametersAndCMKEnabledInADataSovereignRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "service1", {
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
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the metadata of a service instance.
 *
 * @summary create or update the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreateMinimum.json
 */
async function createOrUpdateAServiceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.createOrUpdate("rg1", "service2", {
    kind: "fhir-R4",
    location: "westus2",
    properties: { accessPolicies: [{ objectId: "c487e7d1-3210-41a3-8ccc-e9372b78da47" }] },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAServiceWithAllParameters();
  await createOrUpdateAServiceWithAllParametersAndCMKEnabledInADataSovereignRegion();
  await createOrUpdateAServiceWithMinimumParameters();
}

main().catch(console.error);
