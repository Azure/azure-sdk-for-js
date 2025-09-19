// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 *
 * @summary Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Create_WithMultiRole.json
 */
async function createNewCloudServiceWithMultipleRoles() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters = {
    location: "westus",
    properties: {
      configuration: "{ServiceConfiguration}",
      networkProfile: {
        loadBalancerConfigurations: [
          {
            name: "contosolb",
            properties: {
              frontendIpConfigurations: [
                {
                  name: "contosofe",
                  properties: {
                    publicIPAddress: {
                      id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.Network/publicIPAddresses/contosopublicip",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      packageUrl: "{PackageUrl}",
      roleProfile: {
        roles: [
          {
            name: "ContosoFrontend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
          {
            name: "ContosoBackend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
        ],
      },
      upgradeMode: "Auto",
    },
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 *
 * @summary Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Create_WithMultiRole_WithZones.json
 */
async function createNewCloudServiceWithMultipleRolesInASpecificAvailabilityZone() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters = {
    location: "westus",
    properties: {
      configuration: "{ServiceConfiguration}",
      networkProfile: {
        loadBalancerConfigurations: [
          {
            name: "contosolb",
            properties: {
              frontendIpConfigurations: [
                {
                  name: "contosofe",
                  properties: {
                    publicIPAddress: {
                      id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.Network/publicIPAddresses/contosopublicip",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      packageUrl: "{PackageUrl}",
      roleProfile: {
        roles: [
          {
            name: "ContosoFrontend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
          {
            name: "ContosoBackend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
        ],
      },
      upgradeMode: "Auto",
    },
    zones: ["1"],
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 *
 * @summary Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Create_WithSingleRole.json
 */
async function createNewCloudServiceWithSingleRole() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters = {
    location: "westus",
    properties: {
      configuration: "{ServiceConfiguration}",
      networkProfile: {
        loadBalancerConfigurations: [
          {
            name: "myLoadBalancer",
            properties: {
              frontendIpConfigurations: [
                {
                  name: "myfe",
                  properties: {
                    publicIPAddress: {
                      id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.Network/publicIPAddresses/myPublicIP",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      packageUrl: "{PackageUrl}",
      roleProfile: {
        roles: [
          {
            name: "ContosoFrontend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
        ],
      },
      upgradeMode: "Auto",
    },
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 *
 * @summary Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Create_WithSingleRoleAndCertificate.json
 */
async function createNewCloudServiceWithSingleRoleAndCertificateFromKeyVault() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters = {
    location: "westus",
    properties: {
      configuration: "{ServiceConfiguration}",
      networkProfile: {
        loadBalancerConfigurations: [
          {
            name: "contosolb",
            properties: {
              frontendIpConfigurations: [
                {
                  name: "contosofe",
                  properties: {
                    publicIPAddress: {
                      id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.Network/publicIPAddresses/contosopublicip",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      osProfile: {
        secrets: [
          {
            sourceVault: {
              id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.KeyVault/vaults/{keyvault-name}",
            },
            vaultCertificates: [
              {
                certificateUrl:
                  "https://{keyvault-name}.vault.azure.net:443/secrets/ContosoCertificate/{secret-id}",
                isBootstrapCertificate: true,
              },
            ],
          },
        ],
      },
      packageUrl: "{PackageUrl}",
      roleProfile: {
        roles: [
          {
            name: "ContosoFrontend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
        ],
      },
      upgradeMode: "Auto",
    },
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 *
 * @summary Create or update a cloud service. Please note some properties can be set only during cloud service creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Create_WithSingleRoleAndRDP.json
 */
async function createNewCloudServiceWithSingleRoleAndRdpExtension() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters = {
    location: "westus",
    properties: {
      configuration: "{ServiceConfiguration}",
      extensionProfile: {
        extensions: [
          {
            name: "RDPExtension",
            properties: {
              type: "RDP",
              autoUpgradeMinorVersion: false,
              protectedSettings: "<PrivateConfig><Password>{password}</Password></PrivateConfig>",
              publisher: "Microsoft.Windows.Azure.Extensions",
              settings:
                "<PublicConfig><UserName>UserAzure</UserName><Expiration>10/22/2021 15:05:45</Expiration></PublicConfig>",
              typeHandlerVersion: "1.2",
            },
          },
        ],
      },
      networkProfile: {
        loadBalancerConfigurations: [
          {
            name: "contosolb",
            properties: {
              frontendIpConfigurations: [
                {
                  name: "contosofe",
                  properties: {
                    publicIPAddress: {
                      id: "/subscriptions/{subscription-id}/resourceGroups/ConstosoRG/providers/Microsoft.Network/publicIPAddresses/contosopublicip",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      packageUrl: "{PackageUrl}",
      roleProfile: {
        roles: [
          {
            name: "ContosoFrontend",
            sku: { name: "Standard_D1_v2", capacity: 1, tier: "Standard" },
          },
        ],
      },
      upgradeMode: "Auto",
    },
  };
  const options = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

async function main() {
  await createNewCloudServiceWithMultipleRoles();
  await createNewCloudServiceWithMultipleRolesInASpecificAvailabilityZone();
  await createNewCloudServiceWithSingleRole();
  await createNewCloudServiceWithSingleRoleAndCertificateFromKeyVault();
  await createNewCloudServiceWithSingleRoleAndRdpExtension();
}

main().catch(console.error);
