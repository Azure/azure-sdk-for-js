// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status, and f) get test metrics
 *
 * @summary creates and run a loadtest
 * @azsdk-weight 10
 */

import AzureLoadTesting, {
  isUnexpected,
  beginCreateOrUpdateTestRun,
  beginUploadTestFile,
} from "@azure-rest/load-testing";
import { AbortController } from "@azure/abort-controller";
import { DefaultAzureCredential } from "@azure/identity";
import { createReadStream } from "fs";
import { v4 as uuidv4 } from "uuid";

const readStream = createReadStream("./sample.jmx");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";
  const testId = uuidv4(); // ID to be assigned to a test

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating/Updating a load test
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
  const fileUploadPoller = await beginUploadTestFile(client, testId, "sample.jmx", readStream);
  const fileUploadResult = await fileUploadPoller.pollUntilDone({
    abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
  });

  if (fileUploadPoller.getOperationState().status != "succeeded")
    throw new Error(
      "There is some issue in validation, please make sure uploaded file is a valid JMX." +
        fileUploadResult
    );

  console.log(fileUploadResult);

  // Creating/Updating app component
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

  // Creating/Updating the test run
  const testRunPoller = await beginCreateOrUpdateTestRun(client, testId, displayName);
  const testRunResult = await testRunPoller.pollUntilDone({
    abortSignal: AbortController.timeout(60000), // timeout of 60 seconds
  });

  if (fileUploadPoller.getOperationState().status != "succeeded" && testRunResult)
    throw new Error("There is some issue in running the test, Error Response : " + testRunResult);

  let testRunStarttime = testRunResult.body.startDateTime;
  let testRunEndTime = testRunResult.body.endDateTime;
  let testRunId = testRunResult.body.testRunId;
  if (testRunId) {
    // get list of all metric namespaces and pick the first one
    let metricNamespaces = await client
      .path("/test-runs/{testRunId}/metric-namespaces", testRunId)
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
      .path("/test-runs/{testRunId}/metric-definitions", testRunId)
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
    console.log(testRunResult);

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
}

main().catch(console.error);
