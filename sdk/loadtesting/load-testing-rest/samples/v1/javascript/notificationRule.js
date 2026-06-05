// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to manage notification rules for load tests.
 * Notification rules allow you to receive alerts via Azure Monitor action groups
 * when specific test events occur, such as a test run ending.
 *
 * @summary Demonstrates how to create, get, list, and delete notification rules for load tests.
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { randomUUID } = require("node:crypto");

async function main() {
  /**
   * The dataplane endpoint for the Azure Load Testing resource.
   * Refer to https://learn.microsoft.com/rest/api/apptesting/loadtest/data-plane-uri to understand how to obtain the data-plane endpoint.
   */
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();

  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of a test already created.
  const notificationRuleId = randomUUID();

  // Azure Monitor Action Group resource ID for receiving notifications.
  // Format: /subscriptions/{subId}/resourceGroups/{rg}/providers/microsoft.insights/actionGroups/{name}
  const actionGroupId = process.env["LOADTESTSERVICE_ACTION_GROUP_ID"] || "";

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Define the event filter for test run ended events
  const testRunEndedFilter = {
    kind: "TestRunEnded",
    condition: {
      testRunStatuses: ["DONE", "FAILED", "CANCELLED"],
      testRunResults: ["PASSED", "FAILED"],
    },
  };

  // Creating a notification rule
  const notificationRuleBody = {
    scope: "Tests",
    displayName: "Test Run Completion Notification",
    actionGroupIds: [actionGroupId],
    testIds: [testId],
    eventFilters: {
      testRunEndedEvent: testRunEndedFilter,
    },
  };

  const createResult = await client
    .path("/notification-rules/{notificationRuleId}", notificationRuleId)
    .patch({
      contentType: "application/merge-patch+json",
      body: notificationRuleBody,
    });

  if (isUnexpected(createResult)) {
    throw createResult.body.error;
  }

  console.log(`Notification rule created: ${createResult.body.notificationRuleId}`);

  // Getting the notification rule
  const getResult = await client
    .path("/notification-rules/{notificationRuleId}", notificationRuleId)
    .get();

  if (isUnexpected(getResult)) {
    throw getResult.body.error;
  }

  console.log(`Notification rule retrieved: ${getResult.body.displayName}`);

  // Listing all notification rules
  const listResult = await client.path("/notification-rules").get();

  if (isUnexpected(listResult)) {
    throw listResult.body.error;
  }

  console.log(`Found ${listResult.body.value.length} notification rule(s)`);

  // Deleting the notification rule
  const deleteResult = await client
    .path("/notification-rules/{notificationRuleId}", notificationRuleId)
    .delete();

  if (isUnexpected(deleteResult)) {
    throw deleteResult.body.error;
  }

  console.log("Notification rule deleted successfully.");
}

main().catch(console.error);
