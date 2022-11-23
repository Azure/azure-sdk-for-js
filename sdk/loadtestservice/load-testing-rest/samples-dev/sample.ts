// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status f) get test metrics
 *
 * @summary creates and run a loadtest
 * @azsdk-weight 10
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { createReadStream } from "fs";
import { v4 as uuidv4 } from "uuid";

const readStream = createReadStream("./sample.jmx");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";
  const testId = uuidv4(); // ID to be assigned to a test
  const fileName = uuidv4(); // ID to be assigned to the file being uploaded
  const testRunId = uuidv4(); // ID to be assigned to a testRun
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

  // Uploading .jmx file to a test
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testCreationResult.body.testId, fileName)
    .put({
      contentType: "application/octet-stream",
      body: readStream,
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  // Getting the Validation Status of file

  let fileValidationResult;
  let validationStatus = null;
  //wait for terminal state
  while (
    validationStatus == null ||
    (validationStatus != "VALIDATION_SUCCESS" &&
      validationStatus != "VALIDATION_FAILURE" &&
      validationStatus != "VALIDATION_NOT_REQUIRED")
  ) {
    fileValidationResult = await client
      .path("/tests/{testId}/files/{fileName}", testId, fileName)
      .get();
    if (isUnexpected(fileValidationResult)) {
      throw fileValidationResult.body.error;
    }
    validationStatus = fileValidationResult.body.validationStatus;

    //Check test status after every 2 seconds
    sleep(2000);
  }

  if (validationStatus == "VALIDATION_FAILURE") {
    throw new Error("Invalid file.");
  }

  // Creating app component
  const appComponentCreationResult = await client
    .path("/tests/{testId}/app-components", testId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: testCreationResult.body.testId,
        components: {
          "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo": {
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
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testCreationResult.body.testId,
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

  // Deleting test run
  let deleteTestRunResult = await client.path("/test-runs/{testRunId}", testRunId).delete();

  if (isUnexpected(deleteTestRunResult)) {
    throw deleteTestRunResult.body.error;
  }

  // Deleting test
  let deleteTestResult = await client.path("/tests/{testId}", testId).delete();

  if (isUnexpected(deleteTestResult)) {
    throw deleteTestResult.body.error;
  }
}

main().catch(console.error);
