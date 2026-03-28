// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagamentCreateBackendWithCustomAssignedCertificate_Thumbprints.json
 */
async function apiManagementCreateBackendCustomAssignedCertificateThumbprint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate("rg1", "apimService1", "cabackend", {
    description: "Custom Assigned certificate Example",
    tls: {
      serverCertificateThumbprints: ["1365083bae61ee876fc26850b825d05d3eb2e503"],
      validateCertificateChain: true,
      validateCertificateName: true,
    },
    url: "https://self-signed.badssl.com/",
    protocol: "http",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendProxyBackend.json
 */
async function apiManagementCreateBackendProxyBackend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate("rg1", "apimService1", "proxybackend", {
    description: "description5308",
    credentials: {
      authorization: { parameter: "opensesma", scheme: "Basic" },
      header: { "x-my-1": ["val1", "val2"] },
      query: { sv: ["xx", "bb", "cc"] },
    },
    proxy: { password: "<password>", url: "http://192.168.1.1:8080", username: "Contoso\\admin" },
    tls: { validateCertificateChain: true, validateCertificateName: true },
    url: "https://backendname2644/",
    protocol: "http",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendServiceFabric.json
 */
async function apiManagementCreateBackendServiceFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate("rg1", "apimService1", "sfbackend", {
    description: "Service Fabric Test App 1",
    properties: {
      serviceFabricCluster: {
        clientCertificateId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/certificates/cert1",
        managementEndpoints: ["https://somecluster.com"],
        maxPartitionResolutionRetries: 5,
        serverX509Names: [
          {
            name: "ServerCommonName1",
            issuerCertificateThumbprint: "IssuerCertificateThumbprint1",
          },
        ],
      },
    },
    url: "fabric:/mytestapp/mytestservice",
    protocol: "http",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithAzureRegion.json
 */
async function apiManagementCreateBackendWithAzureRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate("rg1", "apimService1", "azurebackend", {
    azureRegion: "northeurope",
    url: "https://backendname2644/",
    protocol: "http",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithCarbonAwareLoadBalancer.json
 */
async function apiManagementCreateBackendWithCarbonAwareLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate(
    "rg1",
    "apimService1",
    "carbonawareloadbalancerbackend",
    {
      typePropertiesType: "Pool",
      pool: {
        services: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/sustainable-backend-europe-north",
            preferredCarbonEmission: "Medium",
            priority: 1,
            weight: 1,
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/proxybackend",
            priority: 1,
            weight: 1,
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithCustomAssignedCertificate_X509Names.json
 */
async function apiManagementCreateBackendCustomAssignedCertificateX509Names() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate("rg1", "apimService1", "cabackend", {
    description: "Custom Assigned certificate Example",
    tls: {
      serverX509Names: [{ name: "*.badssl.com" }],
      validateCertificateChain: true,
      validateCertificateName: true,
    },
    url: "https://self-signed.badssl.com/",
    protocol: "http",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithPriorityBasedLoadBalancer.json
 */
async function apiManagementCreateBackendWithPriorityBasedLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate(
    "rg1",
    "apimService1",
    "priority-based-load-balancer",
    {
      typePropertiesType: "Pool",
      pool: {
        services: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-1",
            priority: 1,
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-2",
            priority: 1,
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-3",
            priority: 2,
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-4",
            priority: 2,
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithSimpleLoadBalancer.json
 */
async function apiManagementCreateBackendWithSimpleLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate(
    "rg1",
    "apimService1",
    "simple-load-balancer",
    {
      typePropertiesType: "Pool",
      pool: {
        services: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-1",
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-2",
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateBackendWithWeightedLoadBalancer.json
 */
async function apiManagementCreateBackendWithWeightedLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.createOrUpdate(
    "rg1",
    "apimService1",
    "weighted-load-balancer",
    {
      typePropertiesType: "Pool",
      pool: {
        services: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-1",
            weight: 75,
          },
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/backends/backend-2",
            weight: 25,
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateBackendCustomAssignedCertificateThumbprint();
  await apiManagementCreateBackendProxyBackend();
  await apiManagementCreateBackendServiceFabric();
  await apiManagementCreateBackendWithAzureRegion();
  await apiManagementCreateBackendWithCarbonAwareLoadBalancer();
  await apiManagementCreateBackendCustomAssignedCertificateX509Names();
  await apiManagementCreateBackendWithPriorityBasedLoadBalancer();
  await apiManagementCreateBackendWithSimpleLoadBalancer();
  await apiManagementCreateBackendWithWeightedLoadBalancer();
}

main().catch(console.error);
