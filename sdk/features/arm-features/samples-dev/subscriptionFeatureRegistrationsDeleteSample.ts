// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes a feature registration
 *
 * @summary Deletes a feature registration
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationDELETE.json
 */
async function deletesAFeatureRegistration(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const providerNamespace = "subscriptionFeatureRegistrationGroupTestRG";
  const featureName = "testFeature";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const result = await client.subscriptionFeatureRegistrations.delete(
    providerNamespace,
    featureName,
  );
  console.log(result);
}

deletesAFeatureRegistration().catch(console.error);
