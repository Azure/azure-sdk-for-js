// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceBackendProxyBackend.json
 */
async function apiManagementCreateWorkspaceBackendProxyBackend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceBackend.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "proxybackend",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a backend.
 *
 * @summary creates or Updates a backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceBackendServiceFabric.json
 */
async function apiManagementCreateWorkspaceBackendServiceFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceBackend.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "sfbackend",
    {
      description: "Service Fabric Test App 1",
      properties: {
        serviceFabricCluster: {
          clientCertificateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/certificates/cert1",
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceBackendProxyBackend();
  await apiManagementCreateWorkspaceBackendServiceFabric();
}

main().catch(console.error);
