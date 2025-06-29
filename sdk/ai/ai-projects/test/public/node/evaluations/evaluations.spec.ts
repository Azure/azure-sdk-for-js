// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import * as path from "path";
import { fileURLToPath } from "url";
import type {
  AIProjectClient,
  EvaluationWithOptionalName,
  EvaluationsOperations,
  AgentEvaluationRequest,
} from "../../../../src/index.js";
import { EvaluatorIds } from "../../../../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("evaluations - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let evaluations: EvaluationsOperations;
  let containerConnectionName: string;
  let evaluationDeploymentName: string;
  const datasetName = "test-eval-dataset";
  const datasetVersion = "1.4.15";
  const evaluationDisplayName = "Test Evaluation";

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    evaluations = projectsClient.evaluations;

    // Get connection name from environment variable or use a default for recording
    containerConnectionName = assertEnvironmentVariable("AZURE_STORAGE_CONNECTION_NAME");
    evaluationDeploymentName = assertEnvironmentVariable("EVALUATION_DEPLOYMENT_NAME");
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and evaluation operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(evaluations);
  });

  it("should create an evaluation and perform various operations", async function () {
    // Upload a dataset for evaluation
    const sampleDataPath = path.join(__dirname, "./sample_data_evaluation.jsonl");
    await recorder.setMatcher("CustomDefaultMatcher", {
      compareBodies: false,
    });
    const dataset = await projectsClient.datasets.uploadFile(
      datasetName,
      datasetVersion,
      sampleDataPath,
      {
        connectionName: containerConnectionName,
      },
    );

    assert.isNotNull(dataset);
    assert.isNotNull(dataset.id);
    assert.equal(dataset.name, datasetName);
    assert.equal(dataset.version, datasetVersion);

    try {
      // Create a new evaluation
      const newEvaluation: EvaluationWithOptionalName = {
        displayName: evaluationDisplayName,
        description: "This is a test evaluation right now",
        data: {
          type: "dataset",
          id: dataset.id,
        },
        evaluators: {
          relevance: {
            id: EvaluatorIds.RELEVANCE,
            initParams: {
              deploymentName: evaluationDeploymentName,
            },
            dataMapping: {
              query: "${data.query}",
              response: "${data.response}",
            },
          },
        },
      };

      const evaluation = await evaluations.create(newEvaluation);
      assert.isNotNull(evaluation);
      assert.isNotNull(evaluation.name);
      assert.equal(evaluation.displayName, evaluationDisplayName);

      // Get the evaluation by ID
      const retrievedEval = await evaluations.get(evaluation.name);
      assert.isNotNull(retrievedEval);
      assert.equal(retrievedEval.name, evaluation.name);
      assert.equal(retrievedEval.displayName, evaluationDisplayName);
    } finally {
      // Clean up the dataset
      try {
        await projectsClient.datasets.delete(datasetName, datasetVersion);
      } catch (e) {
        // Ignore errors if dataset doesn't exist
      }
    }
  });

  it("should create an agent evaluation", async function () {
    const agent = await projectsClient.agents.createAgent("gpt-4o", {
      name: "agent-evaluation-test",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    const thread = await projectsClient.agents.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    const message = await projectsClient.agents.messages.create(
      thread.id,
      "user",
      "Hello, tell me a joke",
    );
    assert.isNotNull(message);
    assert.isNotNull(message.id);
    // Create and poll a run
    const run = await projectsClient.agents.runs.createAndPoll(thread.id, agent.id, {
      pollingOptions: {
        intervalInMs: 2000,
      },
    });
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    assert.equal(run.status, "completed");

    const agentEvaluationRequest: AgentEvaluationRequest = {
      runId: run.id,
      threadId: thread.id,
      evaluators: {
        violence: {
          id: EvaluatorIds.VIOLENCE,
        },
      },
      samplingConfiguration: {
        name: "test",
        samplingPercent: 100,
        maxRequestRate: 100,
      },
      redactionConfiguration: {
        redactScoreProperties: false,
      },
      appInsightsConnectionString: await projectsClient.telemetry.getConnectionString(),
    };

    const agentEvaluationResponse = await evaluations.createAgentEvaluation(agentEvaluationRequest);
    assert.isNotNull(agentEvaluationResponse);
    assert.isNotNull(agentEvaluationResponse.id);
  });
});
