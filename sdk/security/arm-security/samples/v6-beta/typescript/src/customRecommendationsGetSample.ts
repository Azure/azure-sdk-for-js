// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific custom recommendation for the requested scope by customRecommendationName
 *
 * @summary get a specific custom recommendation for the requested scope by customRecommendationName
 * x-ms-original-file: 2024-08-01/CustomRecommendations/GetByManagementGroupCustomRecommendation_example.json
 */
async function getACustomRecommendationOverManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.get(
    "providers/Microsoft.Management/managementGroups/contoso",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific custom recommendation for the requested scope by customRecommendationName
 *
 * @summary get a specific custom recommendation for the requested scope by customRecommendationName
 * x-ms-original-file: 2024-08-01/CustomRecommendations/GetBySecurityConnectorCustomRecommendation_example.json
 */
async function getACustomRecommendationOverSecurityConnectorScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a specific custom recommendation for the requested scope by customRecommendationName
 *
 * @summary get a specific custom recommendation for the requested scope by customRecommendationName
 * x-ms-original-file: 2024-08-01/CustomRecommendations/GetBySubscriptionCustomRecommendation_example.json
 */
async function getACustomRecommendationOverSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.customRecommendations.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACustomRecommendationOverManagementGroupScope();
  await getACustomRecommendationOverSecurityConnectorScope();
  await getACustomRecommendationOverSubscriptionScope();
}

main().catch(console.error);
