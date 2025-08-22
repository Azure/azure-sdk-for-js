// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The Get Azure Data Catalog Service operation retrieves a json representation of the data catalog.
 *
 * @summary The Get Azure Data Catalog Service operation retrieves a json representation of the data catalog.
 * x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/GetADCCatalog.json
 */

import { DataCatalogRestClient } from "@azure/arm-datacatalog";
import { DefaultAzureCredential } from "@azure/identity";

async function getAzureDataCatalogService(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "exampleResourceGroup";
  const catalogName = "exampleCatalog";
  const credential = new DefaultAzureCredential();
  const client = new DataCatalogRestClient(credential, subscriptionId);
  const result = await client.aDCCatalogs.get(resourceGroupName, catalogName);
  console.log(result);
}

getAzureDataCatalogService().catch(console.error);
