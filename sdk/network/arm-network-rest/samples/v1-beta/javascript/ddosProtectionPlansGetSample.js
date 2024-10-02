// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets information about the specified DDoS protection plan.
 *
 * @summary Gets information about the specified DDoS protection plan.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/DdosProtectionPlanGet.json
 */
async function getDDoSProtectionPlan() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const ddosProtectionPlanName = "test-plan";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans/{ddosProtectionPlanName}",
      subscriptionId,
      resourceGroupName,
      ddosProtectionPlanName
    )
    .get(options);
  console.log(result);
}

getDDoSProtectionPlan().catch(console.error);
