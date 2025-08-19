// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all of the available Microsoft.Features REST API operations.
 *
 * @summary Lists all of the available Microsoft.Features REST API operations.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listFeaturesOperations.json
 */
async function listFeaturesOperations(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listFeaturesOperations().catch(console.error);
