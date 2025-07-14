// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createTestClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const codingData = {
  system: "http://www.ama-assn.org/go/cpt",
  code: "26688-1",
  display: "US BREAST - LEFT LIMITED",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "female",
  birthDate: "1959-11-11T19:00:00+00:00",
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
  code: code,
  description: "US BREAST - LEFT LIMITED",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: `Exam:   US LT BREAST TARGETED
Technique:  Targeted imaging of the  right breast  is performed.
Findings:
Targeted imaging of the left breast is performed from the 6:00 to the 9:00 position.
At the 6:00 position, 5 cm from the nipple, there is a 3 x 2 x 4 mm minimally hypoechoic mass with a peripheral calcification.
This may correspond to the mammographic finding. No other cystic or solid masses visualized.`,
};

const patientDocumentData = {
  type: "note",
  clinicalType: "radiologyReport",
  id: "docid1",
  language: "en",
  authors: [authorData],
  specialtyType: "radiology",
  administrativeMetadata: administrativeMetadata,
  content: content,
  createdAt: "2021-05-31T16:00:00.000Z",
  orderedProceduresAsCsv: "US BREAST - LEFT LIMITED",
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
  "scoringAndAssessment",
  "guidance",
  "qualityMeasure",
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

/**
 *
 * Display the laterality discrepancies of the Radiology Insights request.
 *
 */

function findLateralityDiscrepancy(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "lateralityDiscrepancy") {
            console.log("Laterality Discrepancy Inference found: ");
            displayCodes(inference.lateralityIndication);
          }
        });
      }
    });
  }

  function displayCodes(codeableConcept: any[]): void {
    (codeableConcept as { coding?: any[] }).coding?.forEach((coding) => {
      if ("code" in coding && "display" in coding && "system" in coding) {
        console.log(
          "   Coding: " +
            coding.code +
            ", " +
            coding.display +
            " (" +
            coding.system +
            "), type: " +
            coding.type,
        );
      }
    });
  }
}

describe("Laterality Discrepancy Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createTestClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("laterality discrepancy inference test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138795064698")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findLateralityDiscrepancy(res);
  });
});
