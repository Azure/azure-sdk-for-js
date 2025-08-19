// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get list of exposure control features for specific factory.
 *
 * @summary Get list of exposure control features for specific factory.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ExposureControl_QueryFeatureValuesByFactory.json
 */

import {
  ExposureControlBatchRequest,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exposureControlQueryFeatureValuesByFactory(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const exposureControlBatchRequest: ExposureControlBatchRequest = {
    exposureControlRequests: [
      {
        featureName: "ADFIntegrationRuntimeSharingRbac",
        featureType: "Feature",
      },
      { featureName: "ADFSampleFeature", featureType: "Feature" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.exposureControl.queryFeatureValuesByFactory(
    resourceGroupName,
    factoryName,
    exposureControlBatchRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exposureControlQueryFeatureValuesByFactory();
}

main().catch(console.error);
