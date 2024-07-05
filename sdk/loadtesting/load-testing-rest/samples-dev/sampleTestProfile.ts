import { v4 as uuidv4 } from "uuid";
import AzureLoadTesting, {
    isUnexpected,
    getLongRunningPoller
  } from "@azure-rest/load-testing";
import { AbortController } from "@azure/abort-controller";
import { DefaultAzureCredential } from "@azure/identity";
import { createReadStream } from "fs";
import * as dotenv from "dotenv";

const testFileReadStream = createReadStream("./sample.jmx");

async function main() {
    // Configure environment
    dotenv.config({ path: "../.env"});

    const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
    const testDisplayName = "Sample Load Test using JS SDK";
    const targetResourceId = process.env["LOADTESTSERVICE_TARGETRESOURCEID"] || "";
    const testProfileDisplayName = "Sample Test Profile using JS SDK";
    const testId = uuidv4(); // ID Assigned to the test
    const testProfileId = uuidv4(); // ID Assigned to the test profile
    const testProfileRunId = uuidv4(); // ID Assigned to the test profile run

    const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

    // Step 1 : Create a load test
    const testCreationResult = await client.path("/tests/{testId}", testId)
        .patch({
            contentType: "application/merge-patch+json",
            body: {
                displayName: testDisplayName,
                description: "",
                loadTestConfiguration: {
                    engineInstances: 1,
                },
            },
        });

    if (isUnexpected(testCreationResult)) {
        throw testCreationResult.body.error;
    }

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

    let fileValidationResult;
    const fileValidationPoller = await getLongRunningPoller(client, fileUploadResult);
    try {
        fileValidationResult = await fileValidationPoller.pollUntilDone({
            abortSignal: AbortController.timeout(120 * 1000),
        })
    } catch (ex: any) {
        new Error("Error in polling file validation: " + ex.message);
    }

    if (fileValidationPoller.getOperationState().status != "succeeded" && fileValidationResult) {
        throw new Error(
            "There is some issue in validation, please make sure uploaded file is a valid JMX." +
            fileValidationResult.body.validationFailureDetails,
        );
    }

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
                        "configuration1": {
                            instanceMemoryMB: 2048,
                            httpConcurrency: 10,
                        },
                        "configuration2": {
                            instanceMemoryMB: 4096,
                            httpConcurrency: 20,
                        }
                    }
                }
            }
        });
    
    if (isUnexpected(testProfileCreationResult)) {
        throw testProfileCreationResult.body.error;
    }
}

main().catch(console.error);
