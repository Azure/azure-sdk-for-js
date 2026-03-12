// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Registers the preview feature for the subscription.
 *
 * @summary Registers the preview feature for the subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/registerFeature.json
 */

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

async function registerFeature(): Promise<void> {
  const subscriptionId = "subid";
  const resourceProviderNamespace = "Resource Provider Namespace";
  const featureName = "feature";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const result = await client.features.register(resourceProviderNamespace, featureName);
  console.log(result);
}

registerFeature().catch(console.error);
