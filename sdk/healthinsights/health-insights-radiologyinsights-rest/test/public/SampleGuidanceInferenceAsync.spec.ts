// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createManagedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const codingData = {
  system: "http://www.ama-assn.org/go/cpt",
  code: "71250",
  display: "CT CHEST WO CONTRAST",
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
  value: `History:
    Left renal tumor with thin septations.
    Findings:
    There is a right kidney tumor with nodular calcification.`,
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
 * Display the guidance inference of the Radiology Insights request.
 *
 */

function findGuidance(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "guidance") {
            console.log("Guidance Inference found: ");

            if ("finding" in inference) {
              const find = inference.finding.finding;
              if ("code" in find) {
                const fcode = find.code;
                console.log("   Finding Code: ");
                displayCodes(fcode);
              }
            }

            if ("identifier" in inference) {
              console.log("   Identifier: ");
              displayCodes(inference.identifier);
            }

            inference.presentGuidanceInformation?.forEach((presentInfo: any) => {
              console.log("   Present Guidance Information: ");
              displayPresentGuidanceInformation(presentInfo);
            })

            if ("ranking" in inference) {
              console.log("   Ranking: ", inference.ranking);
            }

            if ("recommendationProposals" in inference) {
              console.log("   Recommendation Proposal: ", inference.recommendationProposals.recommendedProcedure.kind);
            }

            inference.missingGuidanceInformation?.forEach((missingInfo: any) => {
              console.log("   Missing Guidance Information: ", missingInfo);
            })
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

  function displayPresentGuidanceInformation(guidanceinfo: any): void {
    console.log("     Present Guidance Information Item: ", guidanceinfo.presentGuidanceItem);

    guidanceinfo.presentGuidanceValues?.forEach((sizes: any) => {
      console.log("     Present Guidance Value: ", sizes);
    })

    guidanceinfo.sizes?.forEach((sizes: any) => {
      if ("valueQuantity" in sizes) {
        console.log("     Size valueQuantity: ");
        displayQuantityOutput(guidanceinfo.sizes.valueQuantity);
      }
      if ("valueRange" in sizes) {
        if ("low" in sizes.valueRange) {
          console.log("     Size ValueRange: min", sizes.valueRange.low);
        }
        if ("high" in sizes.valueRange) {
          console.log("     Size ValueRange: max", sizes.valueRange.high);
        }
      }
    })

    if ("maximumDiameterAsInText" in guidanceinfo) {
      console.log("     Maximum Diameter As In Text: ");
      displayQuantityOutput(guidanceinfo.maximumDiameterAsInText);
    }

    if ("extension" in guidanceinfo) {
      console.log("     Extension: ");
      displaySectionInfo(guidanceinfo.extension);
    }
  }

  function displayQuantityOutput(quantity: any): void {
    if ("value" in quantity) {
      console.log("     Value: ", quantity.value);
    }
    if ("unit" in quantity) {
      console.log("     Unit: ", quantity.unit);
    }
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

describe("Guidance Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createManagedClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("guidance inference test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138794807347")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findGuidance(res);
  });
});
