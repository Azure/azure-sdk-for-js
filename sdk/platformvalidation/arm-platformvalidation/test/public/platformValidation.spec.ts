// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import type { PollerLike, OperationState } from "@azure/core-lro";
import { delay } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";
import { assert, expect, beforeEach, afterEach, it, describe } from "vitest";
import type { PlatformValidationClient } from "../../src/index.js";
import { createClient, createRecorder } from "./utils/recordedClient.js";

const bootTestName = "compute-vmimagevalidation-vm-boot-test";
const bootTestId = `/providers/Microsoft.PlatformValidation/validationTests/${bootTestName}`;

async function collect<T>(items: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of items) {
    result.push(item);
  }
  return result;
}

async function assertNotFound(action: () => Promise<unknown>): Promise<void> {
  await expect(action()).rejects.toMatchObject({ statusCode: 404 });
}

describe("PlatformValidation", () => {
  let recorder: Recorder;
  let client: PlatformValidationClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder?.stop();
  });

  it("lists provider operations", async () => {
    const operations = await collect(client.operations.list());
    for (const resource of [
      "cloudValidations",
      "cloudValidations/validationExecutionPlans",
      "cloudValidations/validationExecutionPlans/executionPlanRuns",
    ]) {
      assert.isTrue(
        operations.some(
          (operation) =>
            operation.name?.toLowerCase() ===
            `Microsoft.PlatformValidation/${resource}/read`.toLowerCase(),
        ),
        `Missing read operation for ${resource}`,
      );
    }
  });

  it("lists and gets test categories with subscription-scoped IDs", async () => {
    const categories = await collect(client.validationTestCategories.listBySubscription());
    assert.isNotEmpty(categories);
    const category = categories[0];
    assert.isString(category.name);
    const retrieved = await client.validationTestCategories.get(category.name!);
    assert.equal(retrieved.name, category.name);
    assert.equal(retrieved.id, category.id);
    assert.equal(
      retrieved.id?.toLowerCase(),
      `/subscriptions/${assertEnvironmentVariable("AZURE_SUBSCRIPTION_ID")}/providers/Microsoft.PlatformValidation/validationTestCategories/${category.name}`.toLowerCase(),
    );
  });

  it("lists and gets validation tests with subscription-scoped IDs", async () => {
    const tests = await collect(client.validationTests.listBySubscription());
    const test = tests.find((entry) => entry.name === bootTestName);
    assert.isDefined(test, "The approved boot validation must be discoverable");
    const retrieved = await client.validationTests.get(bootTestName);
    assert.equal(retrieved.id, test!.id);
    assert.isNotEmpty(retrieved.properties?.displayName);
    assert.equal(
      retrieved.id?.toLowerCase(),
      `/subscriptions/${assertEnvironmentVariable("AZURE_SUBSCRIPTION_ID")}${bootTestId}`.toLowerCase(),
    );
  });

  it("lists and gets test versions with subscription-scoped IDs", async () => {
    const versions = await collect(client.validationTestVersions.list(bootTestName));
    assert.isNotEmpty(versions);
    const version = versions[0];
    assert.isString(version.name);
    const retrieved = await client.validationTestVersions.get(bootTestName, version.name!);
    assert.equal(retrieved.id, version.id);
    assert.equal(
      retrieved.id?.toLowerCase(),
      `/subscriptions/${assertEnvironmentVariable("AZURE_SUBSCRIPTION_ID")}${bootTestId}/versions/${version.name}`.toLowerCase(),
    );
  });

  it.each(["cloud validation lifecycle", "execution plan lifecycle", "boot execution"])(
    "runs %s",
    async (scenario) => {
      const group = assertEnvironmentVariable("PLATFORMVALIDATION_RESOURCE_GROUP");
      const location = assertEnvironmentVariable("PLATFORMVALIDATION_LOCATION");
      const source = assertEnvironmentVariable("PLATFORMVALIDATION_SOURCE_VHD_URI");
      assert.isTrue(source.startsWith("https://"), "An approved HTTPS VHD is required");
      const cvName = recorder.variable("cloudValidationName", `jscv${Date.now().toString(36)}`);
      const planName = "js-boot-plan";
      const runName = "js-boot-run";
      const cvId = `/subscriptions/${assertEnvironmentVariable("AZURE_SUBSCRIPTION_ID")}/resourceGroups/${group}/providers/Microsoft.PlatformValidation/cloudValidations/${cvName}`;
      const configuration = JSON.stringify({
        apiVersion: "microsoft.validate/executionPlan.v0",
        kind: "ExecutionPlan",
        metadata: { name: planName },
        parameters: {
          certificationPackageReference: {
            osType: "Linux",
            vmGenerationType: "V1",
            architectureType: "X64",
            recommendedVMSizes: ["Standard_D4s_v3"],
            storageProfile: { osDiskImage: { sourceVhdUri: source }, dataDiskImages: [] },
            additionalProperties: {},
          },
        },
        authoring: { steps: [{ name: "vm-boot-test", type: "test", testRef: bootTestId }] },
      });
      const options = {
        abortSignal: AbortSignal.timeout(30 * 60 * 1000),
        updateIntervalInMs: isPlaybackMode() ? 0 : 1000,
      };
      let mutationInProgress = false;
      let cvAttempted = false;
      let planAttempted = false;
      let runAttempted = false;
      let runTerminal = false;

      async function complete<T>(
        poller: PollerLike<OperationState<T>, T>,
        timeoutMinutes = 15,
      ): Promise<T> {
        mutationInProgress = true;
        try {
          return await poller.pollUntilDone({
            abortSignal: AbortSignal.timeout(timeoutMinutes * 60 * 1000),
          });
        } finally {
          mutationInProgress = !poller.isDone;
        }
      }

      await assertNotFound(() => client.cloudValidations.get(group, cvName, options));
      console.log(
        `JS owned resources: group=${group}; cv=${cvName}; plan=${planName}; run=${runName}`,
      );
      try {
        cvAttempted = true;
        const cv = await complete(
          client.cloudValidations.createOrUpdate(
            group,
            cvName,
            {
              location,
              tags: { "sdk-test": cvName },
              properties: { description: "JS SDK owned validation" },
            },
            options,
          ),
        );
        assert.equal(cv.id?.toLowerCase(), cvId.toLowerCase());
        assert.equal(cv.properties?.provisioningState, "Succeeded");
        assert.equal((await client.cloudValidations.get(group, cvName, options)).id, cv.id);
        assert.isTrue(
          (await collect(client.cloudValidations.listByResourceGroup(group, options))).some(
            (entry) => entry.id === cv.id,
          ),
        );
        assert.isTrue(
          (await collect(client.cloudValidations.listBySubscription(options))).some(
            (entry) => entry.id === cv.id,
          ),
        );
        if (scenario === "cloud validation lifecycle") {
          await complete(
            client.cloudValidations.update(
              group,
              cvName,
              {
                tags: { "sdk-test": cvName, phase: "updated" },
                properties: { description: "JS SDK updated validation" },
              },
              options,
            ),
          );
          const updated = await client.cloudValidations.get(group, cvName, options);
          assert.equal(updated.properties?.description, "JS SDK updated validation");
          assert.deepEqual(updated.tags, { "sdk-test": cvName, phase: "updated" });
          return;
        }

        planAttempted = true;
        const plan = await complete(
          client.validationExecutionPlans.createOrUpdate(
            group,
            cvName,
            planName,
            {
              location,
              tags: { "sdk-test": cvName },
              properties: { description: "JS SDK boot plan", planConfigurationJson: configuration },
            },
            options,
          ),
        );
        assert.equal(plan.properties?.provisioningState, "Succeeded");
        assert.equal(
          (await client.validationExecutionPlans.get(group, cvName, planName, options)).id,
          plan.id,
        );
        assert.deepEqual(
          (
            await collect(
              client.validationExecutionPlans.listByResourceGroup(group, cvName, options),
            )
          ).map((entry) => entry.id),
          [plan.id],
        );
        if (scenario === "execution plan lifecycle") {
          await complete(
            client.validationExecutionPlans.update(
              group,
              cvName,
              planName,
              { tags: { "sdk-test": cvName, phase: "updated" } },
              options,
            ),
          );
          const patched = await client.validationExecutionPlans.get(
            group,
            cvName,
            planName,
            options,
          );
          assert.deepEqual(patched.tags, { "sdk-test": cvName, phase: "updated" });
          assert.equal(patched.properties?.description, "JS SDK boot plan");
          // Avoid assertion diagnostics containing signed image URLs.
          assert.isTrue(
            JSON.stringify(JSON.parse(patched.properties?.planConfigurationJson ?? "{}")) ===
              JSON.stringify(JSON.parse(configuration)),
            "Plan PATCH must preserve the image configuration",
          );
          return;
        }

        runAttempted = true;
        let run = await complete(
          client.executionPlanRuns.createOrUpdate(
            group,
            cvName,
            planName,
            runName,
            { properties: { description: "JS SDK boot execution" } },
            options,
          ),
          20,
        );
        for (let attempt = 0; attempt < 180; attempt++) {
          runTerminal = ["Completed", "Succeeded", "Failed", "TimedOut", "Canceled"].includes(
            run.properties?.status ?? "",
          );
          if (runTerminal) {
            break;
          }
          await delay(isPlaybackMode() ? 0 : 10000, { abortSignal: options.abortSignal });
          run = await client.executionPlanRuns.get(group, cvName, planName, runName, options);
        }
        assert.isTrue(
          runTerminal,
          "Boot execution did not reach a terminal state; resources retained",
        );
        assert.include(["Completed", "Succeeded"], run.properties?.status);
        assert.equal(run.properties?.provisioningState, "Succeeded");
        assert.deepInclude(run.properties?.testRunSummary, {
          totalTests: 1,
          passedTests: 1,
          failedTests: 0,
          skippedTests: 0,
          overallResult: "Passed",
        });
        assert.equal(
          (await client.executionPlanRuns.get(group, cvName, planName, runName, options)).id,
          run.id,
        );
        assert.deepEqual(
          (
            await collect(
              client.executionPlanRuns.listByExecutionPlan(group, cvName, planName, options),
            )
          ).map((entry) => entry.id),
          [run.id],
        );
        const results = await collect(
          client.validationTestRuns.listByExecutionPlanRun(
            group,
            cvName,
            planName,
            runName,
            options,
          ),
        );
        assert.lengthOf(results, 1);
        const result = await client.validationTestRuns.get(
          group,
          cvName,
          planName,
          runName,
          results[0].name!,
          options,
        );
        assert.equal(result.id, results[0].id);
        assert.equal(result.properties?.status, "Completed");
        assert.equal(result.properties?.provisioningState, "Succeeded");
        assert.equal(result.properties?.testId, bootTestId);
        assert.isNotEmpty(result.properties?.passDetails);
        assert.isEmpty(result.properties?.failureDetails ?? []);
        assert.isUndefined(result.properties?.error);
      } finally {
        // Never cascade-delete resources underneath an uncertain mutation or active workload.
        if (mutationInProgress || (runAttempted && !runTerminal)) {
          console.error(`Retained owned resources for inspection: ${cvId}`);
        } else {
          const cleanup = {
            abortSignal: AbortSignal.timeout(15 * 60 * 1000),
            updateIntervalInMs: isPlaybackMode() ? 0 : 1000,
          };
          if (runAttempted) {
            await client.executionPlanRuns
              .delete(group, cvName, planName, runName, cleanup)
              .pollUntilDone();
            await assertNotFound(() =>
              client.executionPlanRuns.get(group, cvName, planName, runName, cleanup),
            );
            assert.isEmpty(
              await collect(
                client.executionPlanRuns.listByExecutionPlan(group, cvName, planName, cleanup),
              ),
            );
          }
          if (planAttempted) {
            await client.validationExecutionPlans
              .delete(group, cvName, planName, cleanup)
              .pollUntilDone();
            await assertNotFound(() =>
              client.validationExecutionPlans.get(group, cvName, planName, cleanup),
            );
            assert.isEmpty(
              await collect(
                client.validationExecutionPlans.listByResourceGroup(group, cvName, cleanup),
              ),
            );
          }
          if (cvAttempted) {
            for (let attempt = 0; ; attempt++) {
              assert.isEmpty(
                await collect(
                  client.validationExecutionPlans.listByResourceGroup(group, cvName, cleanup),
                ),
                "Refusing parent deletion while child plans remain",
              );
              try {
                await client.cloudValidations.delete(group, cvName, cleanup).pollUntilDone();
                break;
              } catch (error) {
                // ARM can retain a deleted child briefly after GET and LIST confirm its removal.
                if (
                  !isRestError(error) ||
                  error.statusCode !== 409 ||
                  error.code !== "CannotDeleteResource" ||
                  attempt >= 29
                ) {
                  throw error;
                }
                await delay(isPlaybackMode() ? 0 : 10000, { abortSignal: cleanup.abortSignal });
              }
            }
            await assertNotFound(() => client.cloudValidations.get(group, cvName, cleanup));
            assert.isFalse(
              (await collect(client.cloudValidations.listByResourceGroup(group, cleanup))).some(
                (entry) => entry.name === cvName,
              ),
            );
          }
        }
      }
    },
    45 * 60 * 1000,
  );
});
