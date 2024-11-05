// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the specified Bastion Host.
 *
 * @summary Gets the specified Bastion Host.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/BastionHostGet.json
 */
async function getBastionHost() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const bastionHostName = "bastionhosttenant'";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}",
      subscriptionId,
      resourceGroupName,
      bastionHostName
    )
    .get(options);
  console.log(result);
}

getBastionHost().catch(console.error);
