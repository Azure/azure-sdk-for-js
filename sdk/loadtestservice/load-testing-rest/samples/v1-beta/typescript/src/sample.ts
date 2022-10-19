// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to a) create a loadtest, b) upload a jmx file, c) create appcomponent, d) run test and e) get test status
 *
 * @summary creates and run a loadtest
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";
import createReadStream from "fs";
import { v4 as uuidv4 } from "uuid";

const readStream = createReadStream.readFileSync("./sample.jmx");
dotenv.config();

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
  const testCreationResult: any = await client.path("/loadtests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfig: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });

  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }

  // Uploading .jmx file to a test
  const fileUploadResult = await client
    .path("/loadtests/{testId}/files/{fileId}", testId, fileId)
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
        testId: testId,
        value: {
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
  const testRunCreationResult = await client.path("/testruns/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      vusers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  // Checking the test run status and printing metrics
  const getTestRunResult = await client.path("/testruns/{testRunId}", testRunId).get();

  if (isUnexpected(getTestRunResult)) {
    throw getTestRunResult.body.error;
  }

  console.log(getTestRunResult);
}

main().catch(console.error);
