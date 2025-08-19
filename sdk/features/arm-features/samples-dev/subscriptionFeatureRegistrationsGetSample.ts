// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a feature registration
 *
 * @summary Returns a feature registration
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationGET.json
 */

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

async function getsAFeatureRegistration(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const providerNamespace = "subscriptionFeatureRegistrationGroupTestRG";
  const featureName = "testFeature";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const result = await client.subscriptionFeatureRegistrations.get(providerNamespace, featureName);
  console.log(result);
}

getsAFeatureRegistration().catch(console.error);
