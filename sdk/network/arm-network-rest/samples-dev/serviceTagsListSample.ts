// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ServiceTagsListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a list of service tag information resources.
 *
 * @summary Gets a list of service tag information resources.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceTagsList.json
 */
async function getListOfServiceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "westcentralus";
  const options: ServiceTagsListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/serviceTags",
      subscriptionId,
      location,
    )
    .get(options);
  console.log(result);
}

getListOfServiceTags().catch(console.error);
