// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list.
 *
 * @summary Get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimeObjectMetadata_Get.json
 */

import {
  GetSsisObjectMetadataRequest,
  IntegrationRuntimeObjectMetadataGetOptionalParams,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimeObjectMetadataGet(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "testactivityv2";
  const getMetadataRequest: GetSsisObjectMetadataRequest = {
    metadataPath: "ssisFolders",
  };
  const options: IntegrationRuntimeObjectMetadataGetOptionalParams = {
    getMetadataRequest,
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeObjectMetadata.get(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimeObjectMetadataGet();
}

main().catch(console.error);
