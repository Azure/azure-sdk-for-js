// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureHealthInsightsClient, getLongRunningPoller } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

const codingData = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "USPELVIS",
  display: "US PELVIS COMPLETE",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "female",
  birthDate: new Date("1959-11-11T19:00:00+00:00"),
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
  description: "US PELVIS COMPLETE",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: `CLINICAL HISTORY:
20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy.

COMPARISON:
Right upper quadrant sonographic performed 1 day prior.

TECHNIQUE:
Transabdominal grayscale pelvic sonography with duplex color Doppler
and spectral waveform analysis of the ovaries.

FINDINGS:
The uterus is unremarkable given the transabdominal technique with
endometrial echo complex within physiologic normal limits. The
ovaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the
left measuring 2.8 x 1.5 x 1.9 cm.
On duplex imaging, Doppler signal is symmetric.

IMPRESSION:
1. Normal pelvic sonography. Findings of testicular torsion.
A new US pelvis within the next 6 months is recommended.

These results have been discussed with Dr. Jones at 3 PM on November 5 2020.`,
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
  createdAt: new Date("2021-05-31T16:00:00.000Z"),
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

/**
 *
 * Display the age mismatches of the Radiology Insights request.
 *
 */

function findAgeMismatch(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "ageMismatch") {
            console.log("Age Mismatch Inference found: ");
            const evidence = findAgeEvidence(inference.extension);
            console.log("   Evidence: " + evidence);
          }
        });
      }
    });
  }
}

function findAgeEvidence(extensions: any): string {
  let offset: number = -1;
  let length: number = -1;
  let piece: string = "";
  let evidence: string = "";
  // for loop needed for traversing from top to bottom of the array
  for (const first of extensions) {
    for (const ext of first.extension) {
      if (ext.url === "offset") {
        offset = ext.valueInteger;
      } else if (ext.url === "length") {
        length = ext.valueInteger;
      }
      if (offset > 0 && length > 0) {
        piece = content.value.substring(offset, offset + length);
      }
    }
    evidence += `${piece} `;
  }
  return evidence;
}

describe("Age Mismatch Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("age mismatch inference test", async function () {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138794618263")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findAgeMismatch(res);
  });
});
