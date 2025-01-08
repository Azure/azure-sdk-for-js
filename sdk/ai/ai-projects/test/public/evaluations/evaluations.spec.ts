// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { AIProjectsClient, Evaluation, EvaluationsOperations, EvaluatorConfiguration } from "../../../src/index.js";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";

describe("Evaluations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let evaluations: EvaluationsOperations;
  let evaluation: Evaluation;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    evaluations = projectsClient.evaluations;
    const connections = await projectsClient.connections.listConnections({category: "AzureOpenAI"});
    const defaultConnection = connections[0];
    const endpoint = defaultConnection.properties.target.endsWith("/") ? defaultConnection.properties.target.slice(0, -1) : defaultConnection.properties.target;

    const f1EvaluatorConfiguration: EvaluatorConfiguration = {
      id: "azureml://registries/azureml-staging/models/F1Score-Evaluator/versions/3",
    };
    const defaultConnectionModelConfig = {
      azure_deployment: "<>",
      azure_endpoint: endpoint,
      type: "azure_openai",
      api_version: "<>",
    }
    const relevanceEvaluatorConfiguration: EvaluatorConfiguration = {
      id: "azureml://registries/azureml-staging/models/Relevance-Evaluator/versions/3",
      initParams: {
        modelConfig: defaultConnectionModelConfig
      }
    };
    evaluation = {
      displayName: "Remote Evaluation E2E Test",
      description: "Evaluation of dataset using F1Score and Relevance evaluators",
      data: {
        id: "test_dataset_id",
        type: "dataset",
      },
      evaluators: {
        "f1_score": f1EvaluatorConfiguration,
        "relevance": relevanceEvaluatorConfiguration,
      },
    };
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and evaluation operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(evaluations);
  });

  it("should create evaluation", async function () {
    // Create evaluation
    const createdEvaluation = await evaluations.createEvaluation(evaluation);
    console.log(`Created evaluation, ID: ${createdEvaluation.id}`);
  });

  it("should get evaluation", async function () {
    // Create evaluation
    const createdEvaluation = await evaluations.createEvaluation(evaluation);
    console.log(`Created evaluation, ID: ${createdEvaluation.id}`);

    // Get evaluation
    const getEvaluation = await evaluations.getEvaluation(createdEvaluation.id);
    assert.isNotNull(getEvaluation);
    assert.equal(getEvaluation.id, createdEvaluation.id);
  });

 it("should list evaluations", async function () {
    // Create evaluation
    const createdEvaluation = await evaluations.createEvaluation(evaluation);
    console.log(`Created evaluation, ID: ${createdEvaluation.id}`);

    // List evaluation
    const listEvaluations = await evaluations.listEvaluations();
    assert.isNotEmpty(listEvaluations);
    assert.isAtLeast(listEvaluations.value.length, 1);
  });

  it("should update evaluation", async function () {
    // Create evaluation
    const createdEvaluation = await evaluations.createEvaluation(evaluation);
    console.log(`Created evaluation, ID: ${createdEvaluation.id}`);

    // Update evaluation
    const update = {
      ...evaluation,
      description: "Updated description",
    }
    const updatedEvaluation = await evaluations.updateEvaluation(createdEvaluation.id, update);
    assert.isNotNull(updatedEvaluation);
    assert.equal(updatedEvaluation.displayName, evaluation.displayName);
    console.log(`Updated evaluation displayName to ${updatedEvaluation.displayName}`);
  });
});
