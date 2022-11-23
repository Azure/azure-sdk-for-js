/**
 * This sample demonstrates how to run a test and  get test status
 *
 * @summary creates and run a loadtest
 * @azsdk-weight 10
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { v4 as uuidv4 } from "uuid";

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = uuidv4(); // ID to be assigned to a test
  const testRunId = uuidv4(); // ID to be assigned to a testRun

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating the test run
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      virtualUsers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined)
    throw new Error("Test Run ID returned as undefined.");

  // Checking the test run status and printing metrics
  var testStatus = null;
  var getTestRunResult;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  //wait for terminal state
  while (
    testStatus == null ||
    (testStatus != "DONE" && testStatus != "CANCELLED" && testStatus != "FAILED")
  ) {
    getTestRunResult = await client
      .path("/test-runs/{testRunId}", testRunCreationResult.body.testRunId)
      .get();
    if (isUnexpected(getTestRunResult)) {
      throw getTestRunResult.body.error;
    }
    testStatus = getTestRunResult.body.status;

    //Check test status after every 5 seconds
    sleep(5000);
  }

  if (getTestRunResult === undefined) throw new Error("There is some issue in running the test.");

  let testRunStarttime = getTestRunResult.body.startDateTime;
  let testRunEndTime = getTestRunResult.body.endDateTime;

  // get list of all metric namespaces and pick the first one
  let metricNamespaces = await client
    .path("/test-runs/{testRunId}/metric-namespaces", testRunCreationResult.body.testRunId)
    .get();

  if (isUnexpected(metricNamespaces)) {
    throw metricNamespaces.body.error;
  }

  let metricNamespace = metricNamespaces.body.value[0];

  if (metricNamespace.name === undefined) {
    throw "No Metric Namespace name is defined.";
  }

  // get list of all metric definitions and pick the first one
  let metricDefinitions = await client
    .path("/test-runs/{testRunId}/metric-definitions", testRunCreationResult.body.testRunId)
    .get({
      queryParameters: {
        metricNamespace: metricNamespace.name,
      },
    });

  if (isUnexpected(metricDefinitions)) {
    throw metricDefinitions.body.error;
  }

  let metricDefinition = metricDefinitions.body.value[0];

  if (metricDefinition.name === undefined) {
    throw "No Metric Namespace name is defined.";
  }

  // fetch client metrics using metric namespace and metric name
  let metricsResult = await client.path("/test-runs/{testRunId}/metrics", testRunId).post({
    queryParameters: {
      metricname: metricDefinition.name,
      metricNamespace: metricNamespace.name,
      timespan: testRunStarttime + "/" + testRunEndTime,
    },
  });

  console.log(metricsResult);
  console.log(getTestRunResult);
}
main().catch(console.error);
