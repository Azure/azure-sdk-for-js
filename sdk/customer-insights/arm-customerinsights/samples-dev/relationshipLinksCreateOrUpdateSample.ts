// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a relationship link or updates an existing relationship link within a hub.
 *
 * @summary Creates a relationship link or updates an existing relationship link within a hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/RelationshipLinksCreateOrUpdate.json
 */

import type { RelationshipLinkResourceFormat } from "@azure/arm-customerinsights";
import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function relationshipLinksCreateOrUpdate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const relationshipLinkName = "Somelink";
  const parameters: RelationshipLinkResourceFormat = {
    description: { enUs: "Link Description" },
    displayName: { enUs: "Link DisplayName" },
    interactionType: "testInteraction4332",
    linkName: "Somelink",
    profilePropertyReferences: [
      { interactionPropertyName: "profile1", profilePropertyName: "ProfileId" },
    ],
    relatedProfilePropertyReferences: [
      { interactionPropertyName: "profile1", profilePropertyName: "ProfileId" },
    ],
    relationshipName: "testProfile2326994",
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.relationshipLinks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    hubName,
    relationshipLinkName,
    parameters,
  );
  console.log(result);
}

relationshipLinksCreateOrUpdate().catch(console.error);
