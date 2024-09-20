// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Retrieves a single available sku for network virtual appliance.
 *
 * @summary Retrieves a single available sku for network virtual appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceSkuGet.json
 */
async function networkVirtualApplianceSkuGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const skuName = "ciscoSdwan";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus/{skuName}",
      subscriptionId,
      skuName
    )
    .get(options);
  console.log(result);
}

networkVirtualApplianceSkuGet().catch(console.error);
