// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiManagementServiceResource,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateMultiRegionServiceWithCustomHostname.json
 */
async function apiManagementCreateMultiRegionServiceWithCustomHostname(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    additionalLocations: [
      {
        disableGateway: true,
        location: "East US",
        sku: { name: "Premium", capacity: 1 },
      },
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
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    virtualNetworkType: "None",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateService.json
 */
async function apiManagementCreateService(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    location: "South Central US",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    sku: { name: "Developer", capacity: 1 },
    tags: { name: "Contoso", test: "User" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceHavingMsi.json
 */
async function apiManagementCreateServiceHavingMsi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Consumption", capacity: 0 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceInVnetWithPublicIP.json
 */
async function apiManagementCreateServiceInVnetWithPublicIP(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    location: "East US 2 EUAP",
    publicIpAddressId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgName/providers/Microsoft.Network/publicIPAddresses/apimazvnet",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 2 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    virtualNetworkConfiguration: {
      subnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgName/providers/Microsoft.Network/virtualNetworks/apimcus/subnets/tenant",
    },
    virtualNetworkType: "External",
    zones: ["1", "2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceInZones.json
 */
async function apiManagementCreateServiceInZones(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    location: "North europe",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 2 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    zones: ["1", "2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceSkuv2Service.json
 */
async function apiManagementCreateServiceSkuv2Service(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "StandardV2", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithCustomHostnameKeyVault.json
 */
async function apiManagementCreateServiceWithCustomHostnameKeyVault(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    apiVersionConstraint: { minApiVersion: "2019-01-01" },
    hostnameConfigurations: [
      {
        type: "Proxy",
        defaultSslBinding: true,
        hostName: "gateway1.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId:
          "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "Management",
        hostName: "mgmt.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId:
          "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "Portal",
        hostName: "portal1.msitesting.net",
        identityClientId: "329419bc-adec-4dce-9568-25a6d486e468",
        keyVaultId:
          "https://rpbvtkeyvaultintegration.vault.azure.net/secrets/msitestingCert",
      },
      {
        type: "ConfigurationApi",
        certificatePassword: "Password",
        encodedCertificate: "****** Base 64 Encoded Certificate ************",
        hostName: "configuration-api.msitesting.net",
      },
    ],
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "North Europe",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
    virtualNetworkType: "None",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithDeveloperPortal.json
 */
async function apiManagementCreateServiceWithDeveloperPortal(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    developerPortalStatus: "Enabled",
    location: "South Central US",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    sku: { name: "Developer", capacity: 1 },
    tags: { name: "Contoso", test: "User" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithNatGatewayEnabled.json
 */
async function apiManagementCreateServiceWithNatGatewayEnabled(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    location: "East US",
    natGatewayState: "Enabled",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Premium", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithSystemCertificates.json
 */
async function apiManagementCreateServiceWithSystemCertificates(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    certificates: [
      {
        certificatePassword: "Password",
        encodedCertificate:
          "*******Base64 encoded Certificate******************",
        storeName: "CertificateAuthority",
      },
    ],
    location: "Central US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Basic", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithUserAssignedIdentity.json
 */
async function apiManagementCreateServiceWithUserAssignedIdentity(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/apimService1":
          {},
      },
    },
    location: "West US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Consumption", capacity: 0 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateServiceWithoutLegacyConfigurationApi.json
 */
async function apiManagementCreateServiceWithoutLegacyConfigurationApi(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    configurationApi: { legacyApi: "Disabled" },
    location: "Central US",
    publisherEmail: "apim@autorestsdk.com",
    publisherName: "autorestsdk",
    sku: { name: "Basic", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2", tag3: "value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 *
 * @summary Creates or updates an API Management service. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUndelete.json
 */
async function apiManagementUndelete(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const parameters: ApiManagementServiceResource = {
    location: "South Central US",
    publisherEmail: "foo@contoso.com",
    publisherName: "foo",
    restore: true,
    sku: { name: "Developer", capacity: 1 },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
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
