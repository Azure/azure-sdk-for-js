// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under the given resource group.
 *
 * @summary The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under the given resource group.
 * x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/ListADCCatalogsByResourceGroup.json
 */

import { DataCatalogRestClient } from "@azure/arm-datacatalog";
import { DefaultAzureCredential } from "@azure/identity";

async function listAzureDataCatalogService(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "exampleResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new DataCatalogRestClient(credential, subscriptionId);
  const result = await client.aDCCatalogs.listtByResourceGroup(resourceGroupName);
  console.log(result);
}

listAzureDataCatalogService().catch(console.error);
