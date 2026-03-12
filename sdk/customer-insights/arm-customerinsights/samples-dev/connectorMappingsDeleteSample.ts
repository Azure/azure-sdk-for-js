// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a connector mapping in the connector.
 *
 * @summary Deletes a connector mapping in the connector.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/ConnectorMappingsDelete.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function connectorMappingsDelete(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const connectorName = "testConnector8858";
  const mappingName = "testMapping12491";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.connectorMappings.delete(
    resourceGroupName,
    hubName,
    connectorName,
    mappingName,
  );
  console.log(result);
}

connectorMappingsDelete().catch(console.error);
