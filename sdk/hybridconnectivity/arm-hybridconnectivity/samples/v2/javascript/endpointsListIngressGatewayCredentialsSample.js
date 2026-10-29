// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the ingress gateway endpoint credentials
 *
 * @summary gets the ingress gateway endpoint credentials
 * x-ms-original-file: 2027-01-01/Endpoints_ListIngressGatewayCredentials_MaximumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListIngressGatewayCredentialsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listIngressGatewayCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "csjtwwrsv",
    { listIngressGatewayCredentialsRequest: { serviceName: "SSH" }, expiresin: 7513 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the ingress gateway endpoint credentials
 *
 * @summary gets the ingress gateway endpoint credentials
 * x-ms-original-file: 2027-01-01/Endpoints_ListIngressGatewayCredentials_MinimumSet_Gen.json
 */
async function hybridConnectivityEndpointsPostListIngressGatewayCredentialsGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.endpoints.listIngressGatewayCredentials(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "acwtmooqweqqgfcz",
  );
  console.log(result);
}

async function main() {
  await hybridConnectivityEndpointsPostListIngressGatewayCredentialsGeneratedByMaximumSetRule();
  await hybridConnectivityEndpointsPostListIngressGatewayCredentialsGeneratedByMinimumSetRule();
}

main().catch(console.error);
