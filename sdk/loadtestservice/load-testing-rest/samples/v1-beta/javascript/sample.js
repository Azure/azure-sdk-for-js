// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status
 *
 * @summary creates and run a loadtest
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { createReadStream } = require("fs");
const { v4: uuidv4 } = require("uuid");

const readStream = createReadStream("./sample.jmx");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";
  const testId = uuidv4(); // ID to be assigned to a test
  const fileId = uuidv4(); // ID to be assigned to the file being uploaded
  const testRunId = uuidv4(); // ID to be assigned to a testRun
  const appComponentId = uuidv4(); // ID of the app components

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating a load test
  const testCreationResult = await client.path("/loadtests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfig: {
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

  // Uploading .jmx file to a test
  const fileUploadResult = await client
    .path("/loadtests/{testId}/files/{fileId}", testCreationResult.body.testId, fileId)
    .put({
      contentType: "multipart/form-data",
      body: {
        file: readStream,
      },
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  // Creating app component
  const appComponentCreationResult = await client
    .path("/appcomponents/{name}", appComponentId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "app_component",
        testId: testCreationResult.body.testId,
        value: {
          "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo":
            {
              resourceId:
                "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo",
              resourceName: "App-Service-Sample-Demo",
              resourceType: "Microsoft.Web/sites",
              subscriptionId: SUBSCRIPTION_ID,
            },
        },
      },
    });

  if (isUnexpected(appComponentCreationResult)) {
    throw appComponentCreationResult.body.error;
  }

  // Creating the test run
  const testRunCreationResult = await client.path("/testruns/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testCreationResult.body.testId,
      displayName: displayName,
      vusers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined)
    throw new Error("Test Run ID returned as undefined.");

  // Checking the test run status and printing metrics
  var testStatus = null;
  var getTestRunResult = null;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //wait for terminal state
  while (
    testStatus == null ||
    (testStatus != "DONE" && testStatus != "CANCELLED" && testStatus != "FAILED")
  ) {
    getTestRunResult = await client
      .path("/testruns/{testRunId}", testRunCreationResult.body.testRunId)
      .get();
    if (isUnexpected(getTestRunResult)) {
      throw getTestRunResult.body.error;
    }
    testStatus = getTestRunResult.body.status;

    //Check test status after every 5 seconds
    sleep(5000);
  }

  console.log(getTestRunResult);
}

main().catch(console.error);
