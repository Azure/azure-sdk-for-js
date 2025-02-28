// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ApplicationGatewaysListAvailableRequestHeadersParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all available request headers.
 *
 * @summary Lists all available request headers.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayAvailableRequestHeadersGet.json
 */
async function getAvailableRequestHeaders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: ApplicationGatewaysListAvailableRequestHeadersParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableRequestHeaders",
      subscriptionId,
    )
    .get(options);
  console.log(result);
}

getAvailableRequestHeaders().catch(console.error);
