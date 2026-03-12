// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates an encrypted credentials parameter blob for the specified region. To get the web service from a region other than the region in which it has been created, you must first call Create Regional Web Services Properties to create a copy of the encrypted credential parameter blob in that region. You only need to do this before the first time that you get the web service in the new region.
 *
 * @summary Creates an encrypted credentials parameter blob for the specified region. To get the web service from a region other than the region in which it has been created, you must first call Create Regional Web Services Properties to create a copy of the encrypted credential parameter blob in that region. You only need to do this before the first time that you get the web service in the new region.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/createRegionalProperties.json
 */

import { AzureMLWebServicesManagementClient } from "@azure/arm-webservices";
import { DefaultAzureCredential } from "@azure/identity";

async function createRegionalProperties(): Promise<void> {
  const subscriptionId = "subscription-id";
  const resourceGroupName = "OneResourceGroupName";
  const webServiceName = "TargetWebServiceName";
  const region = "Southeast Asia";
  const credential = new DefaultAzureCredential();
  const client = new AzureMLWebServicesManagementClient(credential, subscriptionId);
  const result = await client.webServices.beginCreateRegionalPropertiesAndWait(
    resourceGroupName,
    webServiceName,
    region,
  );
  console.log(result);
}

createRegionalProperties().catch(console.error);
