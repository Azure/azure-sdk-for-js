// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMLWebServicesManagementClient } from "@azure/arm-webservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the web services in the specified subscription.
 *
 * @summary Gets the web services in the specified subscription.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/getWebServicesBySubscriptionId.json
 */
async function getWebServicesBySubscriptionId(): Promise<void> {
  const subscriptionId = "subscription-id";
  const credential = new DefaultAzureCredential();
  const client = new AzureMLWebServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webServices.listBySubscriptionId()) {
    resArray.push(item);
  }
  console.log(resArray);
}

getWebServicesBySubscriptionId().catch(console.error);
