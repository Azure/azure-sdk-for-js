// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ListNetworkManagerEffectiveSecurityAdminRulesParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List all effective security admin rules applied on a virtual network.
 *
 * @summary List all effective security admin rules applied on a virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerEffectiveSecurityAdminRulesList.json
 */
async function listEffectiveSecurityAdminRules() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const virtualNetworkName = "testVirtualNetwork";
  const options: ListNetworkManagerEffectiveSecurityAdminRulesParameters = {
    body: { skipToken: "FakeSkipTokenCode" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listNetworkManagerEffectiveSecurityAdminRules",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .post(options);
  console.log(result);
}

listEffectiveSecurityAdminRules().catch(console.error);
