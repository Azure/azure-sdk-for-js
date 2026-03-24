// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateMultiRegionServiceWithCustomHostname.json
 */
async function apiManagementCreateMultiRegionServiceWithCustomHostname() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "West US",
    additionalLocations: [
      { disableGateway: true, location: "East US", sku: { name: "Premium", capacity: 1 } },
    ],
    apiVersionConstraint: { minApiVersion: "2019-01-01" },
    hostnameConfigurations: [
      {
        type: "Proxy",
        certificatePassword: "Password",
        defaultSslBinding: true,
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "gateway1.msitesting.net",
      },
      {
        type: "Management",
        certificatePassword: "Password",
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "mgmt.msitesting.net",
      },
      {
        type: "Portal",
        certificatePassword: "Password",
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "portal1.msitesting.net",
      },
      {
        type: "ConfigurationApi",
        certificatePassword: "Password",
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "configuration-api.msitesting.net",
      },
    ],
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    virtualNetworkType: "None",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateService.json
 */
async function apiManagementCreateService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "South Central US",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    sku: { name: "Developer", capacity: 1 },
    tags: { Name: "Contoso", Test: "User" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceHavingMsi.json
 */
async function apiManagementCreateServiceHavingMsi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    identity: { type: "SystemAssigned" },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Consumption", capacity: 0 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceInVnetWithPublicIP.json
 */
async function apiManagementCreateServiceInVnetWithPublicIP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "East US 2 EUAP",
    publicIpAddressId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgName/providers/Microsoft.Network/publicIPAddresses/apimazvnet",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    virtualNetworkConfiguration: {
      subnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgName/providers/Microsoft.Network/virtualNetworks/apimcus/subnets/tenant",
    },
    virtualNetworkType: "External",
    sku: { name: "Premium", capacity: 2 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    zones: ["1", "2"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceInZones.json
 */
async function apiManagementCreateServiceInZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "North europe",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 2 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    zones: ["1", "2"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceSkuv2Service.json
 */
async function apiManagementCreateServiceSkuv2Service() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    identity: { type: "SystemAssigned" },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "StandardV2", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithCustomHostnameKeyVault.json
 */
async function apiManagementCreateServiceWithCustomHostnameKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "North Europe",
    apiVersionConstraint: { minApiVersion: "2019-01-01" },
    hostnameConfigurations: [
      {
        type: "Proxy",
        defaultSslBinding: true,
        hostName: "gateway1.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId: "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "Management",
        hostName: "mgmt.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId: "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "Portal",
        hostName: "portal1.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId: "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "ConfigurationApi",
        certificatePassword: "Password",
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "configuration-api.msitesting.net",
      },
    ],
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    virtualNetworkType: "None",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithDeveloperPortal.json
 */
async function apiManagementCreateServiceWithDeveloperPortal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "South Central US",
    developerPortalStatus: "Enabled",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    sku: { name: "Developer", capacity: 1 },
    tags: { Name: "Contoso", Test: "User" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithNatGatewayEnabled.json
 */
async function apiManagementCreateServiceWithNatGatewayEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "East US",
    natGatewayState: "Enabled",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithSystemCertificates.json
 */
async function apiManagementCreateServiceWithSystemCertificates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "Central US",
    certificates: [
      {
        certificatePassword: "Password",
        encodedCertificate: "*******Base64 encoded Certificate******************",
        storeName: "CertificateAuthority",
      },
    ],
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Basic", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithUserAssignedIdentity.json
 */
async function apiManagementCreateServiceWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/apimService1":
          {},
      },
    },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Consumption", capacity: 0 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateServiceWithoutLegacyConfigurationApi.json
 */
async function apiManagementCreateServiceWithoutLegacyConfigurationApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "Central US",
    configurationApi: { legacyApi: "Disabled" },
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Basic", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUndelete.json
 */
async function apiManagementUndelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.createOrUpdate("rg1", "apimService1", {
    location: "South Central US",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    restore: true,
    sku: { name: "Developer", capacity: 1 },
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateMultiRegionServiceWithCustomHostname();
  await apiManagementCreateService();
  await apiManagementCreateServiceHavingMsi();
  await apiManagementCreateServiceInVnetWithPublicIP();
  await apiManagementCreateServiceInZones();
  await apiManagementCreateServiceSkuv2Service();
  await apiManagementCreateServiceWithCustomHostnameKeyVault();
  await apiManagementCreateServiceWithDeveloperPortal();
  await apiManagementCreateServiceWithNatGatewayEnabled();
  await apiManagementCreateServiceWithSystemCertificates();
  await apiManagementCreateServiceWithUserAssignedIdentity();
  await apiManagementCreateServiceWithoutLegacyConfigurationApi();
  await apiManagementUndelete();
}

main().catch(console.error);
