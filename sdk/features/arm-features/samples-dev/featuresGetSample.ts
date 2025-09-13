// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the preview feature with the specified name.
 *
 * @summary Gets the preview feature with the specified name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/getFeature.json
 */

import { FeatureClient } from "@azure/arm-features";
import { DefaultAzureCredential } from "@azure/identity";

async function getFeature(): Promise<void> {
  const subscriptionId = "subid";
  const resourceProviderNamespace = "Resource Provider Namespace";
  const featureName = "feature";
  const credential = new DefaultAzureCredential();
  const client = new FeatureClient(credential, subscriptionId);
  const result = await client.features.get(resourceProviderNamespace, featureName);
  console.log(result);
}

getFeature().catch(console.error);
