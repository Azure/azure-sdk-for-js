// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { AIProjectsClient, ApplicationInsightsConfiguration, EvaluationSchedule, EvaluationsOperations, EvaluatorConfiguration, RecurrenceTrigger } from "../../../src/index.js";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";

describe("Evaluation schedules", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let evaluations: EvaluationsOperations;
  let name: string;
  let schedule: EvaluationSchedule;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    evaluations = projectsClient.evaluations;

    const appInsightsConfig: ApplicationInsightsConfiguration = {
      type: "applicationInsights",
      resourceId: "<resource_id>",
      query: 'traces | where message contains ""',
      serviceName: "sample_service_name",
    };

    const f1EvaluatorConfiguration: EvaluatorConfiguration = {
      id: "azureml://registries/model-evaluation-dev-01/models/F1ScoreEval/versions/1",
      initParams: {
        columnMapping: {
          response: `${data.message}`,
          groundTruth: `${data.itemType}`,

        }
      }
    };

    const recurrenceTrigger: RecurrenceTrigger = {
      frequency: "Day",
      interval: 1,
      type: "Recurrence"
    };

    const evaluators = {
        "f1_score": f1EvaluatorConfiguration,
    };

    name = "CANARY-ONLINE-EVAL-TEST-WS-ENV-104";
    const description = "Testing Online eval command job in CANARY environment";
    const tags = {"tag1": "value1", "tag2": "value2"};

    schedule = {
      data: appInsightsConfig,
      evaluators: evaluators,
      trigger: recurrenceTrigger,
      description: description,
      tags: tags,
    };
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and evaluation operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(evaluations);
  });

  it("should create evaluation schedule", async function () {
    // Create evaluation schedule
    const createdEvaluationSchedule = await evaluations.createOrReplaceSchedule(name, schedule);
    console.log(`Created evaluation schedule: ${createdEvaluationSchedule}`);
  });

  it("should get evaluation schedule", async function () {
    // Create evaluation schedule
    const createdEvaluationSchedule = await evaluations.createOrReplaceSchedule(name, schedule);
    console.log(`Created evaluation schedule: ${createdEvaluationSchedule}`);

    // Get evaluation schedule
    const getEvaluationSchedule = await evaluations.getSchedule(name);
    assert.isNotNull(getEvaluationSchedule);
    assert.equal(getEvaluationSchedule.description, createdEvaluationSchedule.description);
  });

 it("should list evaluation schedule", async function () {
    // Create evaluation schedule
    const createdEvaluationSchedule = await evaluations.createOrReplaceSchedule(name, schedule);
    console.log(`Created evaluation schedule: ${createdEvaluationSchedule}`);

    // List evaluation schedules
    const listEvaluationSchedules = await evaluations.listSchedules();
    assert.isNotEmpty(listEvaluationSchedules);
    assert.isAtLeast(listEvaluationSchedules.value.length, 1);
  });
});
