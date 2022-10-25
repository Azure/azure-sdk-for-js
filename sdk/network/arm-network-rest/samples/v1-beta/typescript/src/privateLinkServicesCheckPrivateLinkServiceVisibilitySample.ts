// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Checks whether the subscription is visible to private link service.
 *
 * @summary Checks whether the subscription is visible to private link service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CheckPrivateLinkServiceVisibility.json
 */
async function checkPrivateLinkServiceVisibility() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "westus";
  const options: PrivateLinkServicesCheckPrivateLinkServiceVisibilityParameters = {
    body: {
      privateLinkServiceAlias:
        "mypls.00000000-0000-0000-0000-000000000000.azure.privatelinkservice"
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/checkPrivateLinkServiceVisibility",
      subscriptionId,
      location
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

checkPrivateLinkServiceVisibility().catch(console.error);
