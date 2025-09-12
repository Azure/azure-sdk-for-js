// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the preview features that are available through AFEC for the subscription.
 *
 * @summary Gets all the preview features that are available through AFEC for the subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listSubscriptionFeatures.json
 */

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

async function listSubscriptionFeatures(): Promise<void> {
  const subscriptionId = "subid";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.features.listAll()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listSubscriptionFeatures().catch(console.error);
