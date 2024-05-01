// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, delay, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  EvaluationContract,
  EvaluationOutput,
  PersonalizerClient,
  isUnexpected,
} from "../../src";

// skipping Evaluation tests since we need a static resource for this which is not viable in javascript sdk.
describe.skip("Evaluation Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
      },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("run evaluation test", async function () {
    const evaluationContract: EvaluationContract = {
      name: "MyEval",
      startTime: new Date("2022-08-16"),
      endTime: new Date("2022-08-17"),
      enableOfflineExperimentation: true,
      policies: [],
    };
    const response = await createEvaluation(client, evaluationContract);
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    let evaluation = response.body;
    assert.exists(evaluation.id);
    const evaluationId = evaluation.id ?? "";
    await waitForEvaluationToFinish(client, evaluationId);
    evaluation = await getEvaluation(client, evaluationId);
    assert.notEqual(
      evaluation.policyResults?.find((policy) => policy.policySource === "Online"),
      undefined,
    );
    await deleteEvaluation(client, evaluationId);
  });

  it("list evaluations test", async function () {
    const response = await client.path("/evaluations").get();
    assert.equal(response.status, "200");
  });
});

async function createEvaluation(
  client: PersonalizerClient,
  evaluationContract: EvaluationContract,
) {
  return client.path("/evaluations").post({ body: evaluationContract });
}

async function waitForEvaluationToFinish(client: PersonalizerClient, evaluationId: string) {
  while (!(await isEvaluationFinal(client, evaluationId))) {
    delay(60 * 1000);
  }
}

async function isEvaluationFinal(client: PersonalizerClient, evaluationId: string) {
  const evaluation = await getEvaluation(client, evaluationId);
  return (
    evaluation.status === "completed" ||
    evaluation.status === "failed" ||
    evaluation.status === "timeout"
  );
}

async function getEvaluation(
  client: PersonalizerClient,
  evaluationId: string,
): Promise<EvaluationOutput> {
  const response = await client.path("/evaluations/{evaluationId}", evaluationId).get();
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body;
}

async function deleteEvaluation(client: PersonalizerClient, evaluationId: string) {
  const response = await client.path("/evaluations/{evaluationId}", evaluationId).delete();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
}
