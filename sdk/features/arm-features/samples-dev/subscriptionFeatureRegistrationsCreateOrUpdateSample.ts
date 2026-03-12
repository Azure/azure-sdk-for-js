// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a feature registration.
 *
 * @summary Create or update a feature registration.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationPUT.json
 */

import type {
  SubscriptionFeatureRegistration,
  SubscriptionFeatureRegistrationsCreateOrUpdateOptionalParams,
} from "@azure/arm-features";
import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

async function createsAFeatureRegistration(): Promise<void> {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const providerNamespace = "subscriptionFeatureRegistrationGroupTestRG";
  const featureName = "testFeature";
  const subscriptionFeatureRegistrationType: SubscriptionFeatureRegistration = {
    properties: {},
  };
  const options: SubscriptionFeatureRegistrationsCreateOrUpdateOptionalParams = {
    subscriptionFeatureRegistrationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const result = await client.subscriptionFeatureRegistrations.createOrUpdate(
    providerNamespace,
    featureName,
    options,
  );
  console.log(result);
}

createsAFeatureRegistration().catch(console.error);
