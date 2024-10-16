// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ApplicationGatewaysListAvailableSslOptionsParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Lists available Ssl options for configuring Ssl policy.
 *
 * @summary Lists available Ssl options for configuring Ssl policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayAvailableSslOptionsGet.json
 */
async function getAvailableSslOptions() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: ApplicationGatewaysListAvailableSslOptionsParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableSslOptions/default",
      subscriptionId
    )
    .get(options);
  console.log(result);
}

getAvailableSslOptions().catch(console.error);
