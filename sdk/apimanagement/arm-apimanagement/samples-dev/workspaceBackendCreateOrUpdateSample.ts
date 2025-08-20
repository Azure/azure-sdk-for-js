// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or Updates a backend.
 *
 * @summary Creates or Updates a backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceBackendProxyBackend.json
 */

import { BackendContract, ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateWorkspaceBackendProxyBackend(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const backendId = "proxybackend";
  const parameters: BackendContract = {
    description: "description5308",
    credentials: {
      authorization: { parameter: "opensesma", scheme: "Basic" },
      header: { xMy1: ["val1", "val2"] },
      query: { sv: ["xx", "bb", "cc"] },
    },
    proxy: {
      password: "<password>",
      url: "http://192.168.1.1:8080",
      username: "Contoso\\admin",
    },
    tls: { validateCertificateChain: true, validateCertificateName: true },
    url: "https://backendname2644/",
    protocol: "http",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceBackend.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    backendId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or Updates a backend.
 *
 * @summary Creates or Updates a backend.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceBackendServiceFabric.json
 */
async function apiManagementCreateWorkspaceBackendServiceFabric(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const backendId = "sfbackend";
  const parameters: BackendContract = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceBackend.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    backendId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceBackendProxyBackend();
  await apiManagementCreateWorkspaceBackendServiceFabric();
}

main().catch(console.error);
