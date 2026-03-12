// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a Prediction or updates an existing Prediction in the hub.
 *
 * @summary Creates a Prediction or updates an existing Prediction in the hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/PredictionsCreateOrUpdate.json
 */

import type { PredictionResourceFormat } from "@azure/arm-customerinsights";
import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function predictionsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "c909e979-ef71-4def-a970-bc7c154db8c5";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const predictionName = "sdktest";
  const parameters: PredictionResourceFormat = {
    description: { enUs: "sdktest" },
    autoAnalyze: true,
    displayName: { enUs: "sdktest" },
    grades: [],
    involvedInteractionTypes: [],
    involvedKpiTypes: [],
    involvedRelationships: [],
    mappings: {
      grade: "sdktest_Grade",
      reason: "sdktest_Reason",
      score: "sdktest_Score",
    },
    negativeOutcomeExpression: "Customers.FirstName = 'Mike'",
    positiveOutcomeExpression: "Customers.FirstName = 'David'",
    predictionName: "sdktest",
    primaryProfileType: "Customers",
    scopeExpression: "*",
    scoreLabel: "score label",
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.predictions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    hubName,
    predictionName,
    parameters,
  );
  console.log(result);
}

predictionsCreateOrUpdate().catch(console.error);
