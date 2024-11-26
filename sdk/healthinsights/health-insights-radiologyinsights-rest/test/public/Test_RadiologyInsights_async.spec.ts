// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { ClinicalDocumentTypeEnum, getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createTestClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const codingData = {
  system: "http://www.nlm.nih.gov/research/umls",
  code: "C0018802",
  display: "MalignantNeoplasms",
};

const codingData2 = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "111111",
  display: "CT ABD/PELVIS",
};

const code = {
  coding: [codingData],
};

const code2 = {
  coding: [codingData2],
};

const clinicInfoData = {
  resourceType: "Observation",
  status: "unknown",
  code: code,
  valueBoolean: true,
};

const patientInfo = {
  sex: "female",
  birthDate: new Date("1959-11-11T19:00:00+00:00"),
  clinicalInfo: [clinicInfoData],
};

const encounterData = {
  id: "encounterid1",
  period: {
    start: "2021-8-28T00:00:00",
    end: "2021-8-28T00:00:00",
  },
  class: "inpatient",
};

const authorData = {
  id: "authorid1",
  fullName: "authorname1",
};

const orderedProceduresData = {
  code: code2,
  description: "CT ABD/PELVIS",
};
const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: `
The results were faxed to Julie Carter on July 6 2016 at 3 PM
The results were sent via Powerscribe to George Brown, PA.`,
};

const patientDocumentData = {
  type: "note",
  clinicalType: ClinicalDocumentTypeEnum.RadiologyReport,
  id: "docid1",
  language: "en",
  authors: [authorData],
  specialtyType: "radiology",
  administrativeMetadata: administrativeMetadata,
  content: content,
  createdAt: new Date("2021-05-31T22:00:00.000Z"),
  orderedProceduresAsCsv: "US PELVIS COMPLETE",
};

const patientData = {
  id: "Samantha Jones",
  details: patientInfo,
  encounters: [encounterData],
  patientDocuments: [patientDocumentData],
};

const inferenceTypes = [
  "finding",
  "ageMismatch",
  "lateralityDiscrepancy",
  "sexMismatch",
  "completeOrderDiscrepancy",
  "limitedOrderDiscrepancy",
  "criticalResult",
  "criticalRecommendation",
  "followupRecommendation",
  "followupCommunication",
  "radiologyProcedure",
];

const followupRecommendationOptions = {
  includeRecommendationsWithNoSpecifiedModality: true,
  includeRecommendationsInReferences: true,
  provideFocusedSentenceEvidence: true,
};

const findingOptions = {
  provideFocusedSentenceEvidence: true,
};
const inferenceOptions = {
  followupRecommendationOptions: followupRecommendationOptions,
  findingOptions: findingOptions,
};

// Create RI Configuration
const configuration = {
  inferenceOptions: inferenceOptions,
  inferenceTypes: inferenceTypes,
  locale: "en-US",
  verbose: false,
  includeEvidence: true,
};

// create RI Data
const RadiologyInsightsJob = {
  jobData: {
    patients: [patientData],
    configuration: configuration,
  },
};

const param = {
  body: RadiologyInsightsJob,
};

describe("Radiology Insights Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createTestClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("radiology Insights test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138795314335")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
  });
});
