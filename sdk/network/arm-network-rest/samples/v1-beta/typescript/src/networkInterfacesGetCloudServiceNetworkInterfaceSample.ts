// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkInterfacesGetCloudServiceNetworkInterfaceParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specified network interface in a cloud service.
 *
 * @summary Get the specified network interface in a cloud service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CloudServiceNetworkInterfaceGet.json
 */
async function getCloudServiceNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const cloudServiceName = "cs1";
  const roleInstanceName = "TestVMRole_IN_0";
  const networkInterfaceName = "nic1";
  const options: NetworkInterfacesGetCloudServiceNetworkInterfaceParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/networkInterfaces/{networkInterfaceName}",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
      roleInstanceName,
      networkInterfaceName
    )
    .get(options);
  console.log(result);
}

getCloudServiceNetworkInterface().catch(console.error);
