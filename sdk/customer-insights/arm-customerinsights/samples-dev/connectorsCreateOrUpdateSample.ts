// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a connector or updates an existing connector in the hub.
 *
 * @summary Creates a connector or updates an existing connector in the hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/ConnectorsCreateOrUpdate.json
 */

import type { ConnectorResourceFormat } from "@azure/arm-customerinsights";
import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function connectorsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const connectorName = "testConnector";
  const parameters: ConnectorResourceFormat = {
    description: "Test connector",
    connectorProperties: {
      connectionKeyVaultUrl: {
        organizationId: "XXX",
        organizationUrl: "https://XXX.crmlivetie.com/",
      },
    },
    connectorType: "AzureBlob",
    displayName: "testConnector",
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.connectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    hubName,
    connectorName,
    parameters,
  );
  console.log(result);
}

connectorsCreateOrUpdate().catch(console.error);
