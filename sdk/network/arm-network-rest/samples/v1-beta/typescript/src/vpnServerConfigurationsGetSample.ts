// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VpnServerConfigurationsGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves the details of a VpnServerConfiguration.
 *
 * @summary Retrieves the details of a VpnServerConfiguration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnServerConfigurationGet.json
 */
async function vpnServerConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnServerConfigurationName = "vpnServerConfiguration1";
  const options: VpnServerConfigurationsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}",
      subscriptionId,
      resourceGroupName,
      vpnServerConfigurationName
    )
    .get(options);
  console.log(result);
}

vpnServerConfigurationGet().catch(console.error);
