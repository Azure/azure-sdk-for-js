// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createTestClient } from "./utils/recordedClient.js";
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
  value: `EXAM: CT CHEST WO CONTRAST

INDICATION: abnormal lung findings. History of emphysema.

TECHNIQUE: Helical CT images through the chest, without contrast. This exam was performed using one or more of the following dose reduction techniques: Automated exposure control, adjustment of the mA and/or kV according to patient size, and/or use of iterative reconstruction technique. 

COMPARISON: Chest CT dated 6/21/2022.

Number of previous CT examinations or cardiac nuclear medicine (myocardial perfusion) examinations performed in the preceding 12-months: 2

FINDINGS:

Heart size is normal. No pericardial effusion. Thoracic aorta as well as pulmonary arteries are normal in caliber. There are dense coronary artery calcifications. No enlarged axillary, mediastinal, or hilar lymph nodes by CT size criteria. Central airways are widely patent. No bronchial wall thickening. No pneumothorax, pleural effusion or pulmonary edema. The previously identified posterior right upper lobe nodules are no longer seen. However, there are multiple new small pulmonary nodules. An 8 mm nodule in the right upper lobe, image #15 series 4. New posterior right upper lobe nodule measuring 6 mm, image #28 series 4. New 1.2 cm pulmonary nodule, right upper lobe, image #33 series 4. New 4 mm pulmonary nodule left upper lobe, image #22 series 4. New 8 mm pulmonary nodule in the left upper lobe adjacent to the fissure, image #42 series 4. A few new tiny 2 to 3 mm pulmonary nodules are also noted in the left lower lobe. As before there is a background of severe emphysema. No evidence of pneumonia.

Limited evaluation of the upper abdomen shows no concerning abnormality.

Review of bone windows shows no aggressive appearing osseous lesions.


IMPRESSION:

1. Previously identified small pulmonary nodules in the right upper lobe have resolved, but there are multiple new small nodules scattered throughout both lungs. Recommend short-term follow-up with noncontrast chest CT in 3 months as per current  Current guidelines (2017 Fleischner Society).
2. Severe emphysema.

Findings communicated to Dr. Jane Smith.`,
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
            });

            if ("ranking" in inference) {
              console.log("   Ranking: ", inference.ranking);
            }

            if ("recommendationProposals" in inference) {
              inference.recommendationProposals.forEach((proposal: any) => {
                console.log("   Recommendation Proposal: ", proposal.kind);
                console.log("      Recommendation Procedure: ", proposal.recommendedProcedure.kind);
                if ("imagingProcedures" in proposal.recommendedProcedure) {
                  proposal.recommendedProcedure.imagingProcedures?.forEach(
                    (imagingProcedure: any) => {
                      console.log("      Recommended Imaging Procedure Codes: ");
                      displayImaging(imagingProcedure);
                    },
                  );
                }
              });
            }

            inference.missingGuidanceInformation?.forEach((missingInfo: any) => {
              console.log("   Missing Guidance Information: ", missingInfo);
            });
          }
        });
      }
    });
  }

  function displayCodes(codeableConcept: { coding: any[] }): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log(
          "          Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
        );
      }
    });
  }

  function displayPresentGuidanceInformation(guidanceinfo: any): void {
    console.log("     Present Guidance Information Item: ", guidanceinfo.presentGuidanceItem);

    guidanceinfo.presentGuidanceValues?.forEach((sizes: any) => {
      console.log("     Present Guidance Value: ", sizes);
    });

    guidanceinfo.sizes?.forEach((gsizes: any) => {
      if ("valueQuantity" in gsizes) {
        console.log("     Size valueQuantity: ");
        displayQuantityOutput(gsizes.valueQuantity);
      }
      if ("valueRange" in gsizes) {
        if ("low" in gsizes.valueRange) {
          console.log("     Size ValueRange: min", gsizes.valueRange.low);
        }
        if ("high" in gsizes.valueRange) {
          console.log("     Size ValueRange: max", gsizes.valueRange.high);
        }
      }
    });

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

  function displayImaging(images: {
    modality: { coding: any[] };
    anatomy: { coding: any[] };
    laterality: { coding: any[] };
    contrast: { code: { coding: any[] } };
    view: { code: { coding: any[] } };
  }): void {
    console.log("        Modality Codes: ");
    displayCodes(images.modality);
    console.log("        Anatomy Codes: ");
    displayCodes(images.anatomy);
    if ("laterality" in images) {
      console.log("        Laterality Codes: ");
      displayCodes(images.laterality);
    }
    if ("contrast" in images) {
      console.log("        Contrast Codes: ");
      displayCodes(images.contrast.code);
    }
    if ("view" in images) {
      console.log("        View Codes: ");
      displayCodes(images.view.code);
    }
  }
}

describe("Guidance Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createTestClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("guidance inference test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138794807551")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findGuidance(res);
  });
});
