// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get list of exposure control features for specific factory.
 *
 * @summary get list of exposure control features for specific factory.
 * x-ms-original-file: 2018-06-01/ExposureControl_QueryFeatureValuesByFactory.json
 */
async function exposureControlQueryFeatureValuesByFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.exposureControl.queryFeatureValuesByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
    {
      exposureControlRequests: [
        { featureName: "ADFIntegrationRuntimeSharingRbac", featureType: "Feature" },
        { featureName: "ADFSampleFeature", featureType: "Feature" },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await exposureControlQueryFeatureValuesByFactory();
}

main().catch(console.error);
