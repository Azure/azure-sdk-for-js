/**
 * This sample demonstrates how to run a test and get test status
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

  // Creating a load test
  const testCreationResult = await client.path("/tests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfiguration: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });
  // Checking for error response
  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }

  if (testCreationResult.body.testId === undefined)
    throw new Error("Test ID returned as undefined.");

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
    (testStatus != "EXECUTING" && testStatus != "CANCELLED" && testStatus != "FAILED")
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

  if (testStatus == "EXECUTING") {
    let stopTestRunResult = await client.path("/test-runs/{testRunId}:stop", testRunId).post();

    if (isUnexpected(stopTestRunResult)) {
      throw stopTestRunResult.body.error;
    }

    console.log("Test run is stopped.");
  }
}
main().catch(console.error);
