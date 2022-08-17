// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, delay } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, { EvaluationContract, EvaluationOutput, GeneratedClient } from "../../src";
import { env } from "process";

describe("Evaluation Tests", () => {
    let recorder: Recorder;
    let client: GeneratedClient;

    beforeEach(async function (this: Context) {
        recorder = await createRecorder(this);
        client = Personalizer(env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "", {
            key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
        });
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
            policies: []
        };
        const response = await createEvaluationAsync(client, evaluationContract);
        assert.equal(response.status, "201");
        let evaluation = response.body as EvaluationOutput;
        const evaluationId = evaluation.id as string;
        await waitForEvaluationToFinishAsync(client, evaluationId);
        evaluation = await getEvaluationAsync(client, evaluationId);
        assert.notEqual(evaluation.policyResults?.find(policy => policy.policySource === "Online"), undefined);
        await deleteEvaluationAsync(client, evaluationId);
    });

    it("list evaluations test", async function () {
        const response = await client.path("/evaluations").get();
        assert.equal(response.status, "200");
    });
});

async function createEvaluationAsync(client: GeneratedClient, evaluationContract: EvaluationContract) {
    return client.path("/evaluations").post({ body: evaluationContract });
}

async function waitForEvaluationToFinishAsync(client: GeneratedClient, evaluationId: string) {
    while (!await isEvaluationFinalAsync(client, evaluationId)) {
        delay(60 * 1000);
    }
}

async function isEvaluationFinalAsync(client: GeneratedClient, evaluationId: string) {
    const evaluation = await getEvaluationAsync(client, evaluationId);
    return (evaluation.status === "completed" || evaluation.status === "failed" || evaluation.status === "timeout");
}

async function getEvaluationAsync(client: GeneratedClient, evaluationId: string): Promise<EvaluationOutput> {
    const response = await client.path("/evaluations/{evaluationId}", evaluationId).get();
    assert.equal(response.status, "200");
    return response.body as EvaluationOutput;
}

async function deleteEvaluationAsync(client: GeneratedClient, evaluationId: string) {
    const response = await client.path("/evaluations/{evaluationId}", evaluationId).delete();
    assert.equal(response.status, "204");
}
