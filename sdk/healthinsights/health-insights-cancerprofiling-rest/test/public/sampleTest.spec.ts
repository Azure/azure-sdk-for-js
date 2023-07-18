// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  CancerProfilingRestClient,
  DocumentContent,
  CreateJobBodyParam,
  OncoPhenotypeData,
  getLongRunningPoller,
  OncoPhenotypeModelConfiguration,
  PatientDocument,
  PatientInfo,
  PatientRecord,
} from "../../src";

const patientInfo: PatientInfo = {
  sex: "FEMALE",
  birthDate: new Date(1979, 10, 8), // Note: Months are zero-based (11 represents December)
};

const patient1: PatientRecord = {
  id: "patient_id",
  info: patientInfo,
};

let doc1 = "15.8.2021";
("Jane Doe 091175-8967");
("42 year old female, married with 3 children, works as a nurse. ");
("Healthy, no medications taken on a regular basis.");
("PMHx is significant for migraines with aura, uses Mirena for contraception.");
("Smoking history of 10 pack years (has stopped and relapsed several times).");
("She is in c/o 2 weeks of productive cough and shortness of breath.");
("She has a fever of 37.8 and general weakness. ");
("Denies night sweats and rash. She denies symptoms of rhinosinusitis, asthma, and heartburn. ");
("On PE:");
("GENERAL: mild pallor, no cyanosis. Regular breathing rate. ");
("LUNGS: decreased breath sounds on the base of the right lung. Vesicular breathing.");
(" No crackles, rales, and wheezes. Resonant percussion. ");
("PLAN: ");
("Will be referred for a chest x-ray. ");
("======================================");
("CXR showed mild nonspecific opacities in right lung base. ");
("PLAN:");
("Findings are suggestive of a working diagnosis of pneumonia. The patient is referred to a ");
("follow-up CXR in 2 weeks. ");

const docContent: DocumentContent = {
  sourceType: "INLINE",
  value: doc1,
};

const patientDoc1: PatientDocument = {
  type: "NOTE",
  id: "doc1",
  content: docContent,
  clinicalType: "IMAGING",
  language: "en",
  createdDateTime: new Date(2021, 8, 15),
};

let doc2 = "Oncology Clinic ";
("20.10.2021");
("Jane Doe 091175-8967");
("42-year-old healthy female who works as a nurse in the ER of this hospital. ");
("First menstruation at 11 years old. First delivery- 27 years old. She has 3 children.");
("Didn’t breastfeed. ");
("Contraception- Mirena.");
("Smoking- 10 pack years. ");
("Mother- Belarusian. Father- Georgian. ");
("About 3 months prior to admission, she stated she had SOB and was febrile. ");
("She did a CXR as an outpatient which showed a finding in the base of the right lung- ");
("possibly an infiltrate.");
("She was treated with antibiotics with partial response. ");
("6 weeks later a repeat CXR was performed- a few solid dense findings in the right lung. ");
("Therefore, she was referred for a PET-CT which demonstrated increased uptake in the right ");
("breast, lymph nodes on the right a few areas in the lungs and liver. ");
("On biopsy from the lesion in the right breast- triple negative adenocarcinoma. Genetic ");
("testing has not been done thus far. ");
("Genetic counseling- the patient denies a family history of breast, ovary, uterus, ");
("and prostate cancer. Her mother has chronic lymphocytic leukemia (CLL). ");
("She is planned to undergo genetic tests because the aggressive course of the disease, ");
("and her young age. ");
("Impression:");
("Stage 4 triple negative breast adenocarcinoma. ");
("Could benefit from biological therapy. ");
("Different treatment options were explained- the patient wants to get a second opinion.");

const docContent2: DocumentContent = {
  sourceType: "INLINE",
  value: doc2,
};

const patientDoc2: PatientDocument = {
  type: "NOTE",
  id: "doc2",
  content: docContent2,
  clinicalType: "PATHOLOGY",
  language: "en",
  createdDateTime: new Date(2021, 10, 20),
};

const patientDocList: PatientDocument[] = [patientDoc1, patientDoc2];
patient1.data = patientDocList;

const configuration: OncoPhenotypeModelConfiguration = { includeEvidence: true };

const cancerProfilingData: OncoPhenotypeData = {
  patients: [patient1],
  configuration: configuration,
};

const parameters: CreateJobBodyParam = {
  body: cancerProfilingData,
};

describe("My test", () => {
  let recorder: Recorder;
  let client: CancerProfilingRestClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("cancer profiling test", async function () {
    const result = await client.path("/oncophenotype/jobs").post(parameters);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    assert.equal(res.status, "200");
  });
});
