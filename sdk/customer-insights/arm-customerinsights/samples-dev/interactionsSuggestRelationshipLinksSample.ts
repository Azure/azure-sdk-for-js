// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Suggests relationships to create relationship links.
 *
 * @summary Suggests relationships to create relationship links.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/InteractionsSuggestRelationshipLinks.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function interactionsSuggestRelationshipLinks(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const interactionName = "Deposit";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.interactions.suggestRelationshipLinks(
    resourceGroupName,
    hubName,
    interactionName,
  );
  console.log(result);
}

interactionsSuggestRelationshipLinks().catch(console.error);
