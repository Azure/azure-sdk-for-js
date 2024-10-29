// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Retrieves the current status of IDPS signatures for the relevant policy
 *
 * @summary Retrieves the current status of IDPS signatures for the relevant policy
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyQuerySignatureOverrides.json
 */
async function querySignatureOverrides() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const options = {
    body: {
      filters: [{ field: "Mode", values: ["Deny"] }],
      orderBy: { field: "severity", order: "Ascending" },
      resultsPerPage: 20,
      search: "",
      skip: 0,
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/listIdpsSignatures",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName
    )
    .post(options);
  console.log(result);
}

querySignatureOverrides().catch(console.error);
