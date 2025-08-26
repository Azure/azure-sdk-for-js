// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a connector mapping or updates an existing connector mapping in the connector.
 *
 * @summary Creates a connector mapping or updates an existing connector mapping in the connector.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/ConnectorMappingsCreateOrUpdate.json
 */

import type { ConnectorMappingResourceFormat } from "@azure/arm-customerinsights";
import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function connectorMappingsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const connectorName = "testConnector8858";
  const mappingName = "testMapping12491";
  const parameters: ConnectorMappingResourceFormat = {
    description: "Test mapping",
    displayName: "testMapping12491",
    entityType: "Interaction",
    entityTypeName: "TestInteractionType2967",
    mappingProperties: {
      format: { columnDelimiter: "|", formatType: "TextFormat" },
      availability: { frequency: "Hour", interval: 5 },
      completeOperation: {
        completionOperationType: "DeleteFile",
        destinationFolder: "fakePath",
      },
      errorManagement: { errorLimit: 10, errorManagementType: "StopImport" },
      fileFilter: "unknown",
      folderPath: "http://sample.dne/file",
      hasHeader: false,
      structure: [
        {
          columnName: "unknown1",
          isEncrypted: false,
          propertyName: "unknwon1",
        },
        { columnName: "unknown2", isEncrypted: true, propertyName: "unknwon2" },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.connectorMappings.createOrUpdate(
    resourceGroupName,
    hubName,
    connectorName,
    mappingName,
    parameters,
  );
  console.log(result);
}

connectorMappingsCreateOrUpdate().catch(console.error);
