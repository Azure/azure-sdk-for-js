/**
 * This sample demonstrates how to run a test and stop execution
 *
 * @summary creates, run and stop a loadtest
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { v4: uuidv4 } = require("uuid");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = uuidv4(); // ID to be assigned to a test
  const testRunId = uuidv4(); // ID to be assigned to a testRun

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Patching a load test
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

  // Patching the test run
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

  // Checking the test run status
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  sleep(30000);

  let stopTestRunResult = await client.path("/test-runs/{testRunId}:stop", testRunId).post();

  if (isUnexpected(stopTestRunResult)) {
    throw stopTestRunResult.body.error;
  }
}
main().catch(console.error);
