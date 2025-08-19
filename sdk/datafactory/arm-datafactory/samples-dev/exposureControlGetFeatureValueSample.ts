// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get exposure control feature for specific location.
 *
 * @summary Get exposure control feature for specific location.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ExposureControl_GetFeatureValue.json
 */

import {
  ExposureControlRequest,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function exposureControlGetFeatureValue(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const locationId = "WestEurope";
  const exposureControlRequest: ExposureControlRequest = {
    featureName: "ADFIntegrationRuntimeSharingRbac",
    featureType: "Feature",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.exposureControl.getFeatureValue(
    locationId,
    exposureControlRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exposureControlGetFeatureValue();
}

main().catch(console.error);
