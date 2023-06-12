// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {createClient, createRecorder} from "./utils/recordedClient";
import { Context } from "mocha";
import {
  CancerProfilingClient, DocumentContent, InferCancerProfileBodyParam,
  OncoPhenotypeData,
  OncoPhenotypeModelConfiguration,
  PatientDocument,
  PatientInfo,
  PatientRecord
} from "../../src";
import {getLongRunningPoller} from "../../../health-insights-clinicalmatching-rest/src";

const patientInfo: PatientInfo = {
        sex: "FEMALE",
        birthDate: new Date(1979, 10, 8), // Note: Months are zero-based (11 represents December)
    };

    const patient1: PatientRecord = {
        id: "patient_id",
        info: patientInfo,
    };

    let doc1 = "15.8.2021"
        "Jane Doe 091175-8967"
        "42 year old female, married with 3 children, works as a nurse. "
        "Healthy, no medications taken on a regular basis.";

    const docContent: DocumentContent = {
        sourceType: "INLINE",
        value: doc1
    };

    const patientDoc1: PatientDocument = {
        type: "NOTE",
        id: "doc1",
        content: docContent,
        clinicalType: "IMAGING",
        language: "en",
        createdDateTime: new Date(2021, 8, 15)
    };

    const patientDocList: PatientDocument[] = [patientDoc1];
    patient1.data = patientDocList;

    const configuration: OncoPhenotypeModelConfiguration = {includeEvidence: true};

    const cancerProfilingData: OncoPhenotypeData = {
        patients: [patient1],
        configuration: configuration
    };

    const parameters: InferCancerProfileBodyParam = {
        body: cancerProfilingData
    };


describe("My test", () => {
  let recorder: Recorder;
  let client: CancerProfilingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder)
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("cancer profiling test", async function () {
      const result = await client.path("/oncophenotype/jobs").post(parameters);
      const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    assert.equal(res.status, '200');
  });
});
