// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createTestClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const codingData = {
  system: "http://www.ama-assn.org/go/cpt",
  code: "USTHY",
  display: "US THYROID",
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
  description: "CT CHEST WO CONTRAST",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value:
    "\n\n\n\r\n\nExam: US THYROID\n\nClinical History: Thyroid nodules. 76 year old patient.\n\nComparison: none.\n\nFindings:\n\nRight lobe: 4.8 x 1.6 x 1.4 cm\n\nLeft Lobe: 4.1 x 1.3 x 1.3 cm\n\nIsthmus: 4 mm\n\nThere are multiple cystic and partly cystic sub-5 mm nodules noted within the right lobe (TIRADS 2).  \n\nIn the lower pole of the left lobe there is a 9 x 8 x 6 mm predominantly solid isoechoic nodule (TIRADS 3).\n\nImpression:\nMultiple bilateral small cystic benign thyroid nodules. A low suspicion 9 mm left lobe thyroid nodule (TI-RADS 3) which, given its small size, does not warrant follow-up. CADRADS 3/4.\n\n\r\n",
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
  orderedProceduresAsCsv: "CT CHEST WO CONTRAST",
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
 * Display the Scoring and Assessment Inference of the Radiology Insights request.
 *
 */

function findSAInference(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "scoringAndAssessment") {
            console.log("Scoring and Assessment Inference found:");

            if ("category" in inference) {
              console.log("   Category: ", inference.category);
            }

            if ("categoryDescription" in inference) {
              console.log("   Category Description: ", inference.categoryDescription);
            }

            if ("singleValue" in inference) {
              console.log("   Single Value: ", inference.singleValue);
            }

            if ("rangeValue" in inference) {
              console.log("   Range Value: ");
              displayValueRange(inference.rangeValue);
            }
          }
        });
      }
    });
  }

  function displayValueRange(range: any): void {
    if ("minimum" in range) {
      console.log("     Min: ", range.minimum);
    }
    if ("maximum" in range) {
      console.log("     Max: ", range.maximum);
    }
  }
}

describe("Scoring and Assessment Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createTestClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("scoring and assessment inference test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138795260270")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findSAInference(res);
  });
});
