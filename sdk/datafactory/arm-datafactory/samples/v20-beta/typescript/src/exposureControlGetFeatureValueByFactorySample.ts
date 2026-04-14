// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get exposure control feature for specific factory.
 *
 * @summary get exposure control feature for specific factory.
 * x-ms-original-file: 2018-06-01/ExposureControl_GetFeatureValueByFactory.json
 */
async function exposureControlGetFeatureValueByFactory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.exposureControl.getFeatureValueByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
    { featureName: "ADFIntegrationRuntimeSharingRbac", featureType: "Feature" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exposureControlGetFeatureValueByFactory();
}

main().catch(console.error);
