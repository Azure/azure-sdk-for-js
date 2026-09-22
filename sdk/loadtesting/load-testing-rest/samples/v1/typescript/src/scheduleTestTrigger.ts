// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to manage schedule triggers for load tests.
 * Triggers allow you to schedule load tests to run automatically on a recurring basis.
 *
 * @summary Demonstrates how to create, get, list, and delete schedule triggers for load tests.
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import type { DailyRecurrence, ScheduleTestsTrigger } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

async function main(): Promise<void> {
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
  const triggerId = randomUUID();

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Set the start date to a future date
  const startDateTime = new Date();
  startDateTime.setDate(startDateTime.getDate() + 7);

  // Creating a schedule trigger
  const triggerBody: ScheduleTestsTrigger = {
    kind: "ScheduleTestsTrigger",
    displayName: "Daily Load Test Trigger",
    description: "Runs load test daily at the scheduled time",
    testIds: [testId],
    startDateTime: startDateTime.toISOString(),
    recurrence: {
      frequency: "Daily",
      interval: 1,
      recurrenceEnd: {
        numberOfOccurrences: 10,
      },
    } as DailyRecurrence,
  };

  const createResult = await client.path("/triggers/{triggerId}", triggerId).patch({
    contentType: "application/merge-patch+json",
    body: triggerBody,
  });

  if (isUnexpected(createResult)) {
    throw createResult.body.error;
  }

  console.log(`Trigger created: ${createResult.body.triggerId}`);

  // Getting the trigger
  const getResult = await client.path("/triggers/{triggerId}", triggerId).get();

  if (isUnexpected(getResult)) {
    throw getResult.body.error;
  }

  console.log(`Trigger retrieved: ${getResult.body.displayName}`);

  // Listing all triggers
  const listResult = await client.path("/triggers").get();

  if (isUnexpected(listResult)) {
    throw listResult.body.error;
  }

  console.log(`Found ${listResult.body.value.length} trigger(s)`);

  // Deleting the trigger
  const deleteResult = await client.path("/triggers/{triggerId}", triggerId).delete();

  if (isUnexpected(deleteResult)) {
    throw deleteResult.body.error;
  }

  console.log("Trigger deleted successfully.");
}

main().catch(console.error);
