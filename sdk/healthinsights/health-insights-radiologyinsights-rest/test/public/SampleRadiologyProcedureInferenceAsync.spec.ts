// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureHealthInsightsClient, getLongRunningPoller } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

const codingData = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "24727-0",
  display: "CT HEAD W CONTRAST IV",
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
  description: "CT HEAD W CONTRAST IV",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: ` Exam:  Head CT with Contrast

History:  Headaches for 2 months
Technique: Axial, sagittal, and coronal images were reconstructed from helical CT through the head without IV contrast.
IV contrast:  100 mL IV Omnipaque 300.

Findings: There is no mass effect. There is no abnormal enhancement of the brain or within injuries with IV contrast.
However, there is no evidence of enhancing lesion in either internal auditory canal.
Impression: Negative CT of the brain without IV contrast.
I recommend a new brain CT within nine months.`,
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
  createdAt: new Date("2021-05-31T20:00:00.000"),
  orderedProceduresAsCsv: "CT HEAD W CONTRAST IV",
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
 * Display the Radiology Procedure of the Radiology Insights request.
 *
 */

function findRadiologyProcedureInference(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach(
          (inference: {
            kind: string;
            procedureCodes: any[];
            imagingProcedures: any[];
            orderedProcedure: { code: any[]; description: string };
          }) => {
            if (inference.kind === "radiologyProcedure") {
              console.log("Radiology Procedure Inference found");
              inference.procedureCodes?.forEach((procedureCode) => {
                console.log("   Procedure Codes: ");
                displayCodes(procedureCode);
              });

              if ("imagingProcedures" in inference) {
                inference.imagingProcedures.forEach((imagingProcedure) => {
                  console.log("   Imaging Procedure Codes: ");
                  displayImaging(imagingProcedure);
                });
              }

              if ("orderedProcedure" in inference) {
                console.log("   Ordered procedures: ");
                if ("code" in inference.orderedProcedure) {
                  displayCodes(inference.orderedProcedure.code);
                }
              }

              if ("description" in inference.orderedProcedure) {
                console.log("   Description: " + inference.orderedProcedure.description);
              }
            }
          },
        );
      }
    });
  }
}

function displayCodes(codeableConcept: any): void {
  (codeableConcept as { coding?: any[] }).coding?.forEach((coding) => {
    if ("code" in coding && "display" in coding && "system" in coding) {
      console.log(
        "      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
      );
    }
  });
}

function displayImaging(images: {
  modality: { coding: any[] };
  anatomy: { coding: any[] };
  laterality: { coding: any[] };
  contrast: { code: { coding: any[] } };
  view: { code: { coding: any[] } };
}): void {
  console.log("     Modality Codes: ");
  displayCodes(images.modality);
  console.log("     Anatomy Codes: ");
  displayCodes(images.anatomy);
  if ("laterality" in images) {
    console.log("     Laterality Codes: ");
    displayCodes(images.laterality);
  }
  if ("contrast" in images) {
    console.log("     Contrast Codes: ");
    displayCodes(images.contrast.code);
  }
  if ("view" in images) {
    console.log("     View Codes: ");
    displayCodes(images.view.code);
  }
}

describe("Radiology Procedure Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("radiology procedure inference test", async function () {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138795206167")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findRadiologyProcedureInference(res);
  });
});
