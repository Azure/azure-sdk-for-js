// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { paginate } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Returns the list of currently active sessions on the Bastion.
 *
 * @summary Returns the list of currently active sessions on the Bastion.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/BastionSessionDelete.json
 */
async function deletesTheSpecifiedActiveSession() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const bastionHostName = "bastionhosttenant";
  const options = {
    body: {},
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/disconnectActiveSessions",
      subscriptionId,
      resourceGroupName,
      bastionHostName
    )
    .post(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

deletesTheSpecifiedActiveSession().catch(console.error);
