// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Modifies an existing web service resource. The PATCH API call is an asynchronous operation. To determine whether it has completed successfully, you must perform a Get operation.
 *
 * @summary Modifies an existing web service resource. The PATCH API call is an asynchronous operation. To determine whether it has completed successfully, you must perform a Get operation.
 * x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/patchWebService.json
 */

import type { PatchedWebService } from "@azure/arm-webservices";
import { AzureMLWebServicesManagementClient } from "@azure/arm-webservices";
import { DefaultAzureCredential } from "@azure/identity";

async function patchWebService(): Promise<void> {
  const subscriptionId = "subscription-id";
  const resourceGroupName = "OneResourceGroupName";
  const webServiceName = "TargetWebServiceName";
  const patchPayload: PatchedWebService = {
    location: "West US",
    properties: {
      description: "New Web Service Description",
      packageType: "Graph",
      title: "New Web Service Title",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMLWebServicesManagementClient(credential, subscriptionId);
  const result = await client.webServices.beginPatchAndWait(
    resourceGroupName,
    webServiceName,
    patchPayload,
  );
  console.log(result);
}

patchWebService().catch(console.error);
