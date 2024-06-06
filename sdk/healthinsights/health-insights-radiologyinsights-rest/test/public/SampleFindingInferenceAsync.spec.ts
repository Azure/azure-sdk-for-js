// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureHealthInsightsClient, getLongRunningPoller } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

const codingData = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "ANG366",
  display: "XA VENACAVA FILTER INSERTION",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "male",
  birthDate: new Date("1980-04-22T02:00:00+00:00"),
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
  description: "XA VENACAVA FILTER INSERTION",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: `FINDINGS:
  1. Inferior vena cavagram using CO2 contrast shows the IVC is normal
  in course and caliber without filling defects to indicate clot. It
  measures 19.8 mm. in diameter infrarenally.

  2. Successful placement of IVC filter in infrarenal location.`,
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
  createdAt: new Date("2021-05-31T18:00:00.000"),
  orderedProceduresAsCsv: "XA VENACAVA FILTER INSERTION",
};

const patientData = {
  id: "Roberto Lewis",
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
 * Display the finding inference of the Radiology Insights request.
 *
 */

function findFinding(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "finding") {
            console.log("Finding Inference found: ");

            const find = inference.finding;
            if ("code" in find) {
              const fcode = find.code;
              console.log("   Code: ");
              displayCodes(fcode);
            }

            find.interpretation?.forEach((inter: { coding: any }) => {
              console.log("   Interpretation: ");
              displayCodes(inter);
            });

            inference.finding.component?.forEach(
              (comp: { code: any; valueCodeableConcept: any }) => {
                console.log("   Component code: ");
                displayCodes(comp.code);
                if ("valueCodeableConcept" in comp) {
                  console.log("     Value component codeable concept: ");
                  displayCodes(comp.valueCodeableConcept);
                }
              },
            );

            if ("extension" in inference) {
              displaySectionInfo(inference);
            }
          }
        });
      }
    });
  }

  function displayCodes(codeableConcept: { coding: any[] }): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log(
          "      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
        );
      }
    });
  }

  function displaySectionInfo(inference: { extension: any[] }): void {
    inference.extension?.forEach((ext: any) => {
      if ("url" in ext && ext.url === "section") {
        console.log("   Section:");
        ext.extension?.forEach((subextension: { url: string; valueString: string }) => {
          if ("url" in subextension && "valueString" in subextension) {
            console.log("      " + subextension.url + ": " + subextension.valueString);
          }
        });
      }
    });
  }
}

describe("Finding Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("finding inference test", async function () {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138794807336")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findFinding(res);
  });
});
