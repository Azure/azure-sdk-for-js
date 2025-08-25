// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified Security Partner Provider.
 *
 * @summary Deletes the specified Security Partner Provider.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SecurityPartnerProviderDelete.json
 */

import type { SecurityPartnerProvidersDeleteParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteSecurityPartnerProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const securityPartnerProviderName = "securityPartnerProvider";
  const options: SecurityPartnerProvidersDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/securityPartnerProviders/{securityPartnerProviderName}",
      subscriptionId,
      resourceGroupName,
      securityPartnerProviderName,
    )
    .delete(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

deleteSecurityPartnerProvider().catch(console.error);
