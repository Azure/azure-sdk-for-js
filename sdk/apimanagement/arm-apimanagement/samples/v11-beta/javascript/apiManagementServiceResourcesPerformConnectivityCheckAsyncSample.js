// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it.
 *
 * @summary performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPerformConnectivityCheck.json
 */
async function tcpConnectivityCheck() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementServiceResources.performConnectivityCheckAsync(
    "rg1",
    "apimService1",
    {
      destination: { address: "8.8.8.8", port: 53 },
      preferredIPVersion: "IPv4",
      source: { region: "northeurope" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it.
 *
 * @summary performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementPerformConnectivityCheckHttpConnect.json
 */
async function httpConnectivityCheck() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementServiceResources.performConnectivityCheckAsync(
    "rg1",
    "apimService1",
    {
      destination: { address: "https://microsoft.com", port: 3306 },
      protocolConfiguration: {
        httpConfiguration: {
          method: "GET",
          headers: [{ name: "Authorization", value: "Bearer myPreciousToken" }],
          validStatusCodes: [200, 204],
        },
      },
      source: { region: "northeurope" },
      protocol: "HTTPS",
    },
  );
  console.log(result);
}

async function main() {
  await tcpConnectivityCheck();
  await httpConnectivityCheck();
}

main().catch(console.error);
