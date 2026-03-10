// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClient, createRecorder } from "../utils/recordedClient.js";
import type {
  AppComponent,
  AzureLoadTestingClient,
  TestAppComponentsOutput,
  ScheduleTestsTrigger,
  DailyRecurrence,
  TestsNotificationRule,
  TestRunEndedNotificationEventFilter,
} from "../../../src/index.js";
import { isUnexpected } from "../../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import fs from "node:fs";
import { getLongRunningPoller } from "../../../src/pollingHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Test Administration Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-test-20251118";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a load test", async () => {
    const result = await client.path("/tests/{testId}", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "Sample Load Test",
        description: "Sample Load Test Description",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should upload the additional file without LRO", async () => {
    const readStreamAdditionalFile: fs.ReadStream = fs.createReadStream(
      "./test/public/additional-data.csv",
    );
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "additional-data.csv")
      .put({
        contentType: "application/octet-stream",
        body: readStreamAdditionalFile,
        queryParameters: {
          fileType: "ADDITIONAL_ARTIFACTS",
        },
      });

    assert.include(["201"], result.status);
  });

  it("should fail file upload due to LRO timeout", async () => {
    const readStreamTestFile: fs.ReadStream = fs.createReadStream("./test/public/sample.jmx");
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStreamTestFile,
      });

    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }

    const fileValidatePoller = await getLongRunningPoller(client, fileUploadResult);
    try {
      await fileValidatePoller.pollUntilDone({
        abortSignal: AbortSignal.timeout(10), // timeout of 10 milliseconds
      });
    } catch (ex: any) {
      assert.equal(ex.message, "The polling was aborted.");
      return;
    }

    assert.fail();
  });

  it("should upload the test script file with LRO", async () => {
    const readStreamTestFile: fs.ReadStream = fs.createReadStream("./test/public/sample.jmx");
    const fileUploadResult = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .put({
        contentType: "application/octet-stream",
        body: readStreamTestFile,
      });

    if (isUnexpected(fileUploadResult)) {
      throw fileUploadResult.body.error;
    }

    const fileValidatePoller = await getLongRunningPoller(
      client,
      fileUploadResult,
      testPollingOptions,
    );
    await fileValidatePoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(120000), // timeout of 120 seconds
    });
    assert.equal(fileValidatePoller.getOperationState().status, "succeeded");
  });

  it("should create the app components", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";

    const appCompResourceId = `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/contoso-sampleapp-rg/providers/Microsoft.Web/sites/contoso-sampleapp`;
    const appComponent: AppComponent = {
      resourceName: "contoso-sampleapp",
      resourceType: "Microsoft.Web/sites",
    };
    const appComps: Record<string, AppComponent> = {};

    appComps[appCompResourceId] = appComponent;
    const result = await client.path("/tests/{testId}/app-components", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        components: appComps,
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get the test file", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .get();

    assert.include(["200"], result.status);
  });

  it("should get the test", async () => {
    const result = await client.path("/tests/{testId}", testId).get();

    assert.include(["200"], result.status);
  });

  it("should get the test app components", async () => {
    const result = await client.path("/tests/{testId}/app-components", testId).get();

    assert.include(["200"], result.status);
    const output = result.body as TestAppComponentsOutput;
    assert.isNotEmpty(output.components);
  });

  it("should generate test plan recommendations", async () => {
    // Recording test ID should have a recording file already uploaded for the generateTestPlanRecommendations API to work.
    const recordingTestId = env["RECORDING_TEST_ID"] || "";

    const generateRecommendationsResult = await client
      .path("/tests/{testId}:generateTestPlanRecommendations", recordingTestId)
      .post();

    if (isUnexpected(generateRecommendationsResult)) {
      throw new Error(
        `Failed to generate test plan recommendations: ${JSON.stringify(generateRecommendationsResult.body.error)}`,
      );
    }

    const recommendationsPoller = await getLongRunningPoller(
      client,
      generateRecommendationsResult,
      testPollingOptions,
    );

    const recommendationsResult = await recommendationsPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(300000), // 5 minutes timeout for AI recommendations
    });

    assert.equal(recommendationsPoller.getOperationState().status, "succeeded");
    // The result should contain the test with recommendations applied or operation status
    assert.isDefined(recommendationsResult);
  });

  it("should clone the test", async () => {
    const cloneTestId = `${testId}-clone`;
    const cloneResult = await client.path("/tests/{testId}:clone", testId).post({
      body: {
        newTestId: cloneTestId,
        displayName: "Cloned Test",
      },
    });

    if (isUnexpected(cloneResult)) {
      throw new Error(`Failed to clone test: ${JSON.stringify(cloneResult.body.error)}`);
    }

    // Clone test returns 202 Accepted (LRO)
    assert.equal(cloneResult.status, "202");
  });

  it("should delete the test file", async () => {
    const result = await client
      .path("/tests/{testId}/files/{fileName}", testId, "sample.jmx")
      .delete();

    assert.include(["204"], result.status);
  });

  it("should delete the test", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});

describe("Trigger Administration Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-testtrigger-20250226";
  const triggerId = "sample-sdk-trigger-20250301";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Creating a test that the trigger will reference
  it("should create a load test for trigger", async () => {
    const result = await client.path("/tests/{testId}", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "Test for Trigger",
        description: "Test used by trigger tests",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should create a schedule trigger", async () => {
    const startDateTime = new Date();
    startDateTime.setDate(startDateTime.getDate() + 1); // Start tomorrow

    const triggerBody: ScheduleTestsTrigger = {
      kind: "ScheduleTestsTrigger",
      displayName: "Sample Schedule Trigger",
      description: "A sample schedule trigger for SDK testing",
      testIds: [testId],
      startDateTime: startDateTime.toISOString(),
      recurrence: {
        frequency: "Daily",
        interval: 1,
        recurrenceEnd: {
          numberOfOccurrences: 5,
        },
      } as DailyRecurrence,
    };

    const result = await client.path("/triggers/{triggerId}", triggerId).patch({
      contentType: "application/merge-patch+json",
      body: triggerBody,
    });

    if (isUnexpected(result)) {
      throw new Error(`Failed to create trigger: ${JSON.stringify(result.body.error)}`);
    }

    assert.include(["200", "201"], result.status);
    assert.equal(result.body.displayName, "Sample Schedule Trigger");
    assert.equal(result.body.kind, "ScheduleTestsTrigger");
  });

  it("should get the trigger", async () => {
    const result = await client.path("/triggers/{triggerId}", triggerId).get();

    if (isUnexpected(result)) {
      throw new Error(`Failed to get trigger: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "200");
    assert.equal(result.body.triggerId, triggerId);
    assert.equal(result.body.displayName, "Sample Schedule Trigger");
    assert.equal(result.body.kind, "ScheduleTestsTrigger");
  });

  it("should list triggers", async () => {
    const result = await client.path("/triggers").get();

    if (isUnexpected(result)) {
      throw new Error(`Failed to list triggers: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "200");
    assert.isArray(result.body.value);

    const foundTrigger = result.body.value.find((t: any) => t.triggerId === triggerId);
    assert.isDefined(foundTrigger, "Created trigger should be in the list");
  });

  it("should delete the trigger", async () => {
    const result = await client.path("/triggers/{triggerId}", triggerId).delete();

    if (isUnexpected(result)) {
      throw new Error(`Failed to delete trigger: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "204");
  });

  it("should verify trigger is deleted", async () => {
    const result = await client.path("/triggers/{triggerId}", triggerId).get();

    assert.equal(isUnexpected(result), true);
  });

  it("should delete the test used by trigger", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});

describe("Notification Rule Administration Operations", () => {
  let recorder: Recorder;
  let client: AzureLoadTestingClient;
  const testId = "sample-sdk-testnotify-20250226";
  const notificationRuleId = "sample-sdk-notifyrule-20250301";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Creating a test that the notification rule will reference
  it("should create a load test for notification rule", async () => {
    const result = await client.path("/tests/{testId}", testId).patch({
      contentType: "application/merge-patch+json",
      body: {
        displayName: "Test for Notification Rule",
        description: "Test used by notification rule tests",
        loadTestConfiguration: {
          engineInstances: 1,
          splitAllCSVs: false,
        },
      },
    });

    assert.include(["200", "201"], result.status);
  });

  it("should create a notification rule with TestRunEnded event", async () => {
    const SUBSCRIPTION_ID = env["SUBSCRIPTION_ID"] || "";

    // Action group resource ID (this should be a valid Azure Monitor action group)
    const actionGroupId = `/subscriptions/${SUBSCRIPTION_ID}/resourcegroups/nikita-canary-rg/providers/microsoft.insights/actiongroups/nikita-canary`;

    const testRunEndedFilter: TestRunEndedNotificationEventFilter = {
      kind: "TestRunEnded",
      condition: {
        testRunStatuses: ["DONE", "FAILED", "CANCELLED"],
        testRunResults: ["PASSED", "FAILED"],
      },
    };

    const notificationRuleBody: TestsNotificationRule = {
      scope: "Tests",
      displayName: "Sample Notification Rule",
      actionGroupIds: [actionGroupId],
      testIds: [testId],
      eventFilters: {
        testRunEndedEvent: testRunEndedFilter,
      },
    };

    const result = await client
      .path("/notification-rules/{notificationRuleId}", notificationRuleId)
      .patch({
        contentType: "application/merge-patch+json",
        body: notificationRuleBody,
      });

    if (isUnexpected(result)) {
      throw new Error(`Failed to create notification rule: ${JSON.stringify(result.body.error)}`);
    }

    assert.include(["200", "201"], result.status);
    assert.equal(result.body.displayName, "Sample Notification Rule");
    assert.equal(result.body.scope, "Tests");
    assert.isArray(result.body.actionGroupIds);
  });

  it("should get the notification rule", async () => {
    const result = await client
      .path("/notification-rules/{notificationRuleId}", notificationRuleId)
      .get();

    if (isUnexpected(result)) {
      throw new Error(`Failed to get notification rule: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "200");
    assert.equal(result.body.notificationRuleId, notificationRuleId);
    assert.equal(result.body.displayName, "Sample Notification Rule");
    assert.equal(result.body.scope, "Tests");
  });

  it("should list notification rules", async () => {
    const result = await client.path("/notification-rules").get();

    if (isUnexpected(result)) {
      throw new Error(`Failed to list notification rules: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "200");
    assert.isArray(result.body.value);

    const foundRule = result.body.value.find(
      (r: any) => r.notificationRuleId === notificationRuleId,
    );
    assert.isDefined(foundRule, "Created notification rule should be in the list");
  });

  it("should delete the notification rule", async () => {
    const result = await client
      .path("/notification-rules/{notificationRuleId}", notificationRuleId)
      .delete();

    if (isUnexpected(result)) {
      throw new Error(`Failed to delete notification rule: ${JSON.stringify(result.body.error)}`);
    }

    assert.equal(result.status, "204");
  });

  it("should verify notification rule is deleted", async () => {
    const result = await client
      .path("/notification-rules/{notificationRuleId}", notificationRuleId)
      .get();

    assert.equal(isUnexpected(result), true);
  });

  it("should delete the test used by notification rule", async () => {
    const result = await client.path("/tests/{testId}", testId).delete();

    assert.include(["204"], result.status);
  });
});
