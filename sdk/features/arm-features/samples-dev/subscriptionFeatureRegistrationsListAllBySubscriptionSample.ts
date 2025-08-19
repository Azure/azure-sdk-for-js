// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns subscription feature registrations for given subscription.
 *
 * @summary Returns subscription feature registrations for given subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationLISTALL.json
 */
async function getsAListOfFeatureRegistrations(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subscriptionFeatureRegistrations.listAllBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

getsAListOfFeatureRegistrations().catch(console.error);
