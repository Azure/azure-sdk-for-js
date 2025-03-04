// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SecurityPartnerProvidersGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Security Partner Provider.
 *
 * @summary Gets the specified Security Partner Provider.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SecurityPartnerProviderGet.json
 */
async function getSecurityPartnerProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const securityPartnerProviderName = "securityPartnerProvider";
  const options: SecurityPartnerProvidersGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/securityPartnerProviders/{securityPartnerProviderName}",
      subscriptionId,
      resourceGroupName,
      securityPartnerProviderName,
    )
    .get(options);
  console.log(result);
}

getSecurityPartnerProvider().catch(console.error);
