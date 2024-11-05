// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkInterfaceIPConfigurationsListParameters,
  paginate,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get all ip configurations in a network interface.
 *
 * @summary Get all ip configurations in a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceIPConfigurationList.json
 */
async function networkInterfaceIPConfigurationList() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const networkInterfaceName = "nic1";
  const options: NetworkInterfaceIPConfigurationsListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/ipConfigurations",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

networkInterfaceIPConfigurationList().catch(console.error);
