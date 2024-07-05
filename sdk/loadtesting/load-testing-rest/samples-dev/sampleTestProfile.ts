import { v4 as uuidv4 } from "uuid";
import AzureLoadTesting, { isUnexpected, getLongRunningPoller } from "@azure-rest/load-testing";
import { AbortController } from "@azure/abort-controller";
import { DefaultAzureCredential } from "@azure/identity";
import { createReadStream } from "fs";
import * as dotenv from "dotenv";

const testFileReadStream = createReadStream("./sample.jmx");

async function main() {
  // Configure environment
  dotenv.config({ path: "../.env" });

  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const testDisplayName = "Sample Load Test using JS SDK";
  const targetResourceId = process.env["LOADTESTSERVICE_TARGETRESOURCEID"] || "";
  const testProfileDisplayName = "Sample Test Profile using JS SDK";
  const testProfileRunDisplayName = "Sample Test Profile Run using JS SDK";
  const testId = uuidv4(); // ID Assigned to the test
  const testProfileId = uuidv4(); // ID Assigned to the test profile
  const testProfileRunId = uuidv4(); // ID Assigned to the test profile run

  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Step 1 : Create a load test
  const testCreationResult = await client.path("/tests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: testDisplayName,
      description: "",
      loadTestConfiguration: {
        engineInstances: 1,
      },
      autoStopCriteria: {
        autoStopDisabled: true,
      },
    },
  });

  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }

  console.log("Test Created with ID: " + testCreationResult.body.testId); // Remove

  // Step 2 : Upload test plan for the test
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
    .put({
      contentType: "application/octet-stream",
      body: testFileReadStream,
    });

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  console.log("File uploaded successfully."); // Remove

  let fileValidationResult;
  const fileValidationPoller = await getLongRunningPoller(client, fileUploadResult);
  try {
    fileValidationResult = await fileValidationPoller.pollUntilDone({
      abortSignal: AbortController.timeout(120 * 1000),
    });
  } catch (ex: any) {
    new Error("Error in polling file validation: " + ex.message);
  }

  if (fileValidationPoller.getOperationState().status != "succeeded" && fileValidationResult) {
    throw new Error(
      "There is some issue in validation, please make sure uploaded file is a valid JMX." +
        fileValidationResult.body.validationFailureDetails,
    );
  }

  console.log("File uploaded and validated successfully."); // Remove

  // Step 3 : Create a test profile
  const testProfileCreationResult = await client
    .path("/test-profiles/{testProfileId}", testProfileId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        testId: testId,
        targetResourceId: targetResourceId,
        displayName: testProfileDisplayName,
        description: "",
        targetResourceConfigurations: {
          kind: "FunctionsFlexConsumption",
          configurations: {
            configuration1: {
              instanceMemoryMB: 2048,
              httpConcurrency: 10,
            },
            configuration2: {
              instanceMemoryMB: 4096,
              httpConcurrency: 20,
            },
          },
        },
      },
    });

  if (isUnexpected(testProfileCreationResult)) {
    throw testProfileCreationResult.body.error;
  }

  console.log(
    "TestProfile created successfully with ID: " + testProfileCreationResult.body.testProfileId,
  ); // Remove

  // Step 4 : Create Test Profile Run
  const testProfileRunCreationResult = await client
    .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: testProfileRunDisplayName,
        testProfileId: testProfileId,
        description: "",
      },
    });

  if (isUnexpected(testProfileRunCreationResult)) {
    throw testProfileRunCreationResult.body.error;
  }

  console.log("TestProfileRun created successfully with ID: " + testProfileRunId);

  let testProfileRunCompletionResult;
  const testProfileRunPoller = await getLongRunningPoller(client, testProfileRunCreationResult);
  try {
    testProfileRunCompletionResult = await testProfileRunPoller.pollUntilDone({
      abortSignal: AbortController.timeout(1800 * 1000), // timeout of 30 minutes
    });
  } catch (ex: any) {
    new Error("Error in polling test profile run completion: " + ex.message);
  }

  if (
    testProfileRunPoller.getOperationState().status != "succeeded" &&
    testProfileRunCompletionResult
  ) {
    var testProfileRunErrors = testProfileRunCompletionResult.body.errorDetails?.reduce(
      (v, e) => v + e.message,
      "",
    );
    throw new Error("Test Profile Run failed to complete with error: " + testProfileRunErrors);
  }

  console.log("TestProfileRun completed successfully."); // Remove
}

main().catch(console.error);
