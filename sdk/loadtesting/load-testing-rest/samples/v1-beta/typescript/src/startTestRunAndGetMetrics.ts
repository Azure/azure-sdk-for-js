// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a test, poll for its status and then fetch metrics from it.
 *
 * @summary Demonstrates how to start a test run and get metrics.
 */

import AzureLoadTesting, { isUnexpected, getLongRunningPoller } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

async function main(): Promise<void> {
  /**
   * The dataplane endpoint for the Azure Load Testing resource.
   * Refer to https://learn.microsoft.com/rest/api/loadtesting/data-plane-uri to understand how to obtain the data-plane endpoint.
   */
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();
  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of a test already created.

  const testRunId = randomUUID(); // Random ID for the Test Run
  const displayName = "Sample Test Run";

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Creating the test run
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  let testRunResult;

  const testRunPoller = await getLongRunningPoller(client, testRunCreationResult);
  try {
    testRunResult = await testRunPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(90000), // timeout of 90 seconds
    });
  } catch (ex: any) {
    new Error("Error in polling for test run completion: " + ex.message); // Polling timed out
  }

  if (testRunPoller.getOperationState().status !== "succeeded") {
    throw new Error("There is some issue in running the test, Error Response : " + testRunResult);
  }

  if (testRunResult) {
    const testRunStartTime = testRunResult.body.startDateTime;
    const testRunEndTime = testRunResult.body.endDateTime;

    // Get the list of all metric namespaces and pick the first one
    const metricNamespaces = await client
      .path("/test-runs/{testRunId}/metric-namespaces", testRunId)
      .get();

    if (isUnexpected(metricNamespaces)) {
      throw metricNamespaces.body.error;
    }

    const metricNamespace = metricNamespaces.body.value[0];

    if (metricNamespace.name === undefined) {
      throw "No Metric Namespace name is defined.";
    }

    // Get the list of all metric definitions and pick the first one
    const metricDefinitions = await client
      .path("/test-runs/{testRunId}/metric-definitions", testRunId)
      .get({
        queryParameters: {
          metricNamespace: metricNamespace.name,
        },
      });

    if (isUnexpected(metricDefinitions)) {
      throw metricDefinitions.body.error;
    }

    const metricDefinition = metricDefinitions.body.value[0];

    if (metricDefinition.name === undefined) {
      throw "No Metric Definition name is defined.";
    }

    // Fetch client metrics using metric namespace and metric definition name
    const metricsResult = await client.path("/test-runs/{testRunId}/metrics", testRunId).post({
      queryParameters: {
        metricname: metricDefinition.name,
        metricNamespace: metricNamespace.name,
        timespan: testRunStartTime + "/" + testRunEndTime,
      },
    });

    console.log(metricsResult);
    console.log(testRunResult);
  }
}
main().catch(console.error);
